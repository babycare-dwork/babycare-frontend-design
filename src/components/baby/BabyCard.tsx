import React, {useCallback, useState} from "react";
import {Calendar, Clock, Edit2, Syringe, Trash2, User} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import ActionModal from "@/components/ActionModal";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import babyService from "@/Service/baby.service";
import BabyFormModal from "@/components/baby/BabyFormModal";
import VaccineFormModal from "@/components/baby/VaccineModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NepaliDate from "nepali-date-converter"

export interface Baby {
    id: number;
    name: string;
    dob: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    image: string | null;
    recent_record: {
        weight: string;
        height: string;
        head_circumference: string;
    } | null;
}

interface BabyCardProps {
    baby: Baby;
    onEditAction?: () => void;
    onDeleteAction?: () => void;
}

const BabyCard: React.FC<BabyCardProps> = ({baby, onDeleteAction}) => {
    const queryClient = useQueryClient();
    const router = useRouter()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false);

    const {data: vaccines = []} = useQuery({
        queryKey: ["baby-vaccines", baby.id],
        queryFn: () => babyService.getVaccines(baby.id),
        enabled: isVaccineModalOpen,
    });

    const deleteBabyMutation = useMutation({
        mutationFn: (id: number) => babyService.deleteBaby(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["babies"]});
            setIsDeleteModalOpen(false);
            if (onDeleteAction) onDeleteAction();
        },
    });

    const calculateAge = useCallback((dob: string) => {
        const [bsYear, bsMonth, bsDay] = dob.split("-").map(Number)
        
        // Accurately convert BS to AD
        const nepaliDate = new NepaliDate(bsYear, bsMonth - 1, bsDay)
        const adDate = nepaliDate.toJsDate() // returns JS Date in AD
        
        const diff = Date.now() - adDate.getTime()
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
        const years = Math.floor(totalDays / 365)
        const months = Math.floor((totalDays % 365) / 30)
        const days = Math.floor((totalDays % 365) % 30)

        if (years > 0) return `${years}y ${months}m`
        if (months > 0) return `${months}m ${days}d`
        return `${days}d`
    }, [])

    const handleDelete = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        await deleteBabyMutation.mutateAsync(baby.id);
    }, [baby.id, deleteBabyMutation]);

    const handleEditForm = useCallback(() => {
        setIsEditModalOpen(true);
    }, []);

    const handleEditSuccess = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["babies"] });
        setIsEditModalOpen(false);
        // if (onEditAction) onEditAction();
    }, [queryClient]);

    const handleVaccines = useCallback(() => {
        setIsVaccineModalOpen(true);
    }, []);

    const formatDateDisplay = useCallback((date: string) => {
        try {
            const d = new Date(date);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        } catch {
            return date;
        }
    }, []);

    const getGenderColor = (gender: string) => {
        switch (gender) {
            case "MALE":
                return "bg-sky-soft text-shield border-sky";
            case "FEMALE":
                return "bg-blush-soft text-coral-strong border-coral";
            case "OTHER":
                return "bg-blush-soft text-coral-strong border-coral";
            default:
                return "bg-muted text-ink border-border";
        }
    };

    const getGradient = (gender: string) => {
        switch (gender) {
            case "MALE":
                return "bg-sky-soft text-shield";
            case "FEMALE":
                return "bg-blush-soft text-coral-strong";
            case "OTHER":
                return "bg-honey-soft text-honey-ink";
            default:
                return "bg-sprout-soft text-leaf";
        }
    };

    const convertGenderToNumber = (gender: "MALE" | "FEMALE" | "OTHER"): 0 | 1 => {
        return gender === "MALE" ? 0 : 1;
    };

    return (
        <>
            <div
                onClick={() => router.push(`/baby/${baby.id}`)}
                className="overflow-hidden cursor-pointer rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-border bg-card group">
                <div
                    className={`${getGradient(
                        baby.gender
                    )} relative h-56 sm:h-64 md:h-72 flex items-center justify-center`}
                >
                    {baby.image ? (
                        <Image
                            src={baby.image}
                            alt={baby.name}
                            fill
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-card flex items-center justify-center shadow-sm">
                            <User className="h-10 w-10 sm:h-12 sm:w-12"/>
                        </div>
                    )}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                        <Badge className={`${getGenderColor(baby.gender)} font-semibold text-xs sm:text-sm`}>
                            {baby.gender}
                        </Badge>
                    </div>
                </div>

                <div className="p-4">
                    <div className="mb-3 sm:mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-ink mb-1 sm:mb-2 truncate">
                            {baby.name}
                        </h3>
                        <div className="flex items-center gap-2 text-ink-muted">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"/>
                            <span className="text-xs sm:text-sm font-medium">
                                {calculateAge(baby.dob)} old
                            </span>
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-ink-muted">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"/>
                            <span className="truncate">Born: {baby.dob}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={(e) => { e.stopPropagation(); handleEditForm(); }}
                            variant="outline"
                            size="sm"
                            className="flex-1 group-hover:bg-sky-soft group-hover:border-sky hover:text-shield text-xs sm:text-sm"
                        >
                            <Edit2 className="h-3 w-3"/>
                            <span className="inline">Edit</span>
                        </Button>
                        <Button
                            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-danger hover:bg-danger-soft hover:text-danger hover:border-danger/30 text-xs sm:text-sm"
                        >
                            <Trash2 className="h-3 w-3"/>
                            <span className="inline">Delete</span>
                        </Button>
                        <Button
                            onClick={(e) => { e.stopPropagation(); handleVaccines(); }}
                            variant="outline"
                            size="sm"
                            className="flex-1 group-hover:bg-sprout-soft group-hover:border-sprout hover:text-leaf text-xs sm:text-sm"
                        >
                            <Syringe className="h-3 w-3"/>
                            <span className="inline">Vaccines</span>
                        </Button>
                        <Button
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                router.push(`/baby/${baby.id}`); 
                            }}
                            variant="outline"
                            size="sm"
                            className="flex-1 group-hover:bg-blush-soft group-hover:border-coral hover:text-coral-strong text-xs sm:text-sm"
                        >
                            <Calendar className="h-3 w-3"/>
                            <span className="inline">Growth Monitor</span>
                        </Button>
                    </div>
                </div>
            </div>

            <BabyFormModal
                isOpen={isEditModalOpen}
                mode="edit"
                initialData={{
                    name: baby.name,
                    dob: baby.dob,
                    gender: convertGenderToNumber(baby.gender),
                    image: baby.image as any,
                    height: baby.recent_record ? Number(baby.recent_record.height) : undefined,
                    weight: baby.recent_record ? Number(baby.recent_record.weight) : undefined,
                    head_circumference: baby.recent_record ? Number(baby.recent_record.head_circumference) : undefined,
                }}
                babyId={baby.id}
                onCloseAction={() => setIsEditModalOpen(false)}
                onSubmitAction={handleEditSuccess}
            />

            <ActionModal
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                title="Delete Baby Record"
                description="Are you sure you want to delete this baby record? This action cannot be undone and will remove all associated data."
                confirmLabel="Delete"
                confirmVariant="destructive"
                loading={deleteBabyMutation.isPending}
                onConfirm={handleConfirmDelete}
            />

            <VaccineFormModal
                open={isVaccineModalOpen}
                onOpenChange={setIsVaccineModalOpen}
                babyName={baby.name}
                babyId={baby.id}
            />
        </>
    );
};

export default BabyCard;