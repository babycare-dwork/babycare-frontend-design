'use client'

import {useAuth} from "@/hooks/useAuth"
import {Mail, MapPin, Phone, Shield, User} from "lucide-react"


export default function ProfilePage() {
    const {user} = useAuth()

    if (!user) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-surface-sunken p-4">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-shield border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-ink-muted">Loading profile...</p>
                </div>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen bg-surface-sunken py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-32 sm:h-48 bg-shield">
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                    </div>

                    <div className="relative px-4 sm:px-8 pb-8">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6">
                            <div className="relative">
                                <div
                                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-xl overflow-hidden bg-shield">
                                    {user.media ? (
                                        <img
                                            src={user.media}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="absolute bottom-2 right-2 w-6 h-6 bg-leaf rounded-full border-4 border-white"></div>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-ink">
                                    {user.name}
                                </h1>
                                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                                    <Shield className="w-4 h-4 text-shield"/>
                                    <p className="text-sm text-ink-muted">
                                        ID: {user.uuid}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-ink mb-4">
                                    Contact Information
                                </h2>

                                <div
                                    className="bg-muted rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-soft flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-shield"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-ink-muted mb-1">
                                                Email Address
                                            </p>
                                            <p className="text-sm sm:text-base font-semibold text-ink break-all">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-muted rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sprout-soft flex items-center justify-center flex-shrink-0">
                                            <Phone
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-leaf"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-ink-muted mb-1">
                                                Phone Number
                                            </p>
                                            <p className="text-sm sm:text-base font-semibold text-ink">
                                                {user.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-ink mb-4">
                                    Additional Details
                                </h2>

                                <div
                                    className="bg-muted rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blush-soft flex items-center justify-center flex-shrink-0">
                                            <MapPin
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-coral-strong"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-ink-muted mb-1">
                                                Address
                                            </p>
                                            <p className="text-sm sm:text-base font-semibold text-ink">
                                                {user.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-muted rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-honey-soft flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-honey-ink"/>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs sm:text-sm font-medium text-ink-muted mb-1">
                                                User ID
                                            </p>
                                            <p className="text-sm sm:text-base font-semibold text-ink">
                                                #{user.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">*/}
                        {/*    <button*/}
                        {/*        disabled*/}
                        {/*        className="flex-1 bg-shield hover:bg-shield text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl">*/}
                        {/*        Edit Profile*/}
                        {/*    </button>*/}
                        {/*    <button*/}
                        {/*        className="flex-1 bg-line hover:bg-line-strong text-ink font-semibold py-3 px-6 rounded-xl transition-colors duration-300">*/}
                        {/*        Settings*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}