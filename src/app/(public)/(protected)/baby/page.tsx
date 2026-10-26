'use client'

import {useQuery, useQueryClient} from "@tanstack/react-query";
import babyService from "@/Service/baby.service";
import React, {useState} from "react";
import {Baby as BabyIcon, Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import BabyCard from "@/components/baby/BabyCard";
import BabyFormModal from "@/components/baby/BabyFormModal";
import { BabyPageSkeleton } from "@/components/skeleton/BabyPageSkeleton";

export interface Baby {
    id: number;
    name: string;
    dob: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    media: string | null;
    recent_record: {
        weight: string;
        height: string;
        head_circumference: string;
    } | null;
}

export default function BabyPage() {
    const queryClient = useQueryClient();
    const [showAddModal, setShowAddModal] = useState(false);

    const {data: babies = [], isLoading} = useQuery({
        queryKey: ["babies"],
        queryFn: async () => {
            const res = await babyService.getAllBaby();
            return res?.data ?? [];
        },
    });

    if (isLoading) {
        return <BabyPageSkeleton />
    }

    return (
        <div className="min-h-screen bg-sky-soft p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-ink flex items-center gap-3">
                            <BabyIcon className="h-8 w-8 text-shield"/>
                            Baby Care Dashboard
                        </h1>
                        <p className="text-ink-muted mt-2">
                            Manage your little ones and their vaccination schedules
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowAddModal(true)}
                        size="lg"
                        className="w-full sm:w-auto bg-shield shadow-lg"
                    >
                        <Plus className="h-5 w-5 mr-2"/>
                        Add Baby
                    </Button>
                </div>

                {babies.length === 0 ? (
                    <Card className="border-2 border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <BabyIcon className="h-16 w-16 text-ink-muted mb-4"/>
                            <h3 className="text-xl font-semibold text-ink-muted mb-2">
                                No babies added yet
                            </h3>
                            <p className="text-ink-muted mb-6 text-center max-w-md">
                                Start by adding your first baby to track their growth and vaccination schedule
                            </p>
                            <Button onClick={() => setShowAddModal(true)}>
                                <Plus className="h-4 w-4 mr-2"/>
                                Add Your First Baby
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {babies.map((baby: Baby) => (
                            <BabyCard key={baby.id} baby={{...baby, image: baby.media}}/>
                        ))}
                    </div>
                )}

                <BabyFormModal
                    isOpen={showAddModal}
                    mode="create"
                    onCloseAction={() => {
                        setShowAddModal(false);
                        queryClient.invalidateQueries({queryKey: ["babies"]});
                    }}
                />
            </div>
        </div>
    );
}
