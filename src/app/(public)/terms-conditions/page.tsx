import type {Metadata} from "next"
import {AlertTriangle, Ban, Calendar, CheckCircle, Copyright, FileText, Gavel, Mail, Shield, User} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"

export const metadata: Metadata = {
    title: "Terms and Conditions - Baby Care App",
    description:
        "Read the terms and conditions for the Baby Care App created by D.work. Learn about user responsibilities, service usage, and legal agreements.",
    openGraph: {
        title: "Terms and Conditions - Baby Care App",
        description:
            "Read the terms and conditions for the Baby Care App created by D.work. Learn about user responsibilities, service usage, and legal agreements.",
        url: "https://yourdomain.com/terms-and-conditions",
        siteName: "Baby Care App",
        type: "website",
        images: [
            {
                url: "/baby.png",
                width: 1200,
                height: 630,
                alt: "Baby Care App Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms and Conditions - Baby Care App",
        description:
            "Read the terms and conditions for the Baby Care App created by D.work. Learn about user responsibilities, service usage, and legal agreements.",
        images: ["/baby.png"],
    },
}

export default function TermsAndConditions() {
    return (
        <div
            className="min-h-screen bg-surface-sunken">
            {/* Header Section */}
            <div className="bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-sprout-soft rounded-full">
                                <FileText className="h-8 w-8 text-leaf"/>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-ink mb-4">Terms and Conditions</h1>
                        <p className="text-xl text-ink-muted max-w-3xl mx-auto">
                            Please read these terms and conditions carefully before using our Baby Care app. By using
                            our service, you
                            agree to be bound by these terms.
                        </p>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <Badge variant="secondary" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4"/>
                                Effective: May 28, 2025
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-2">
                                <FileText className="h-4 w-4"/>
                                Version 1.0
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Table of Contents */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Contents</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <a
                                    href="#acceptance"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Acceptance of Terms
                                </a>
                                <a
                                    href="#use-of-service"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Use of Service
                                </a>
                                <a
                                    href="#user-accounts"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    User Accounts
                                </a>
                                <a
                                    href="#prohibited-uses"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Prohibited Uses
                                </a>
                                <a
                                    href="#intellectual-property"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Intellectual Property
                                </a>
                                <a
                                    href="#disclaimers"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Disclaimers
                                </a>
                                <a
                                    href="#limitation"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Limitation of Liability
                                </a>
                                <a
                                    href="#termination"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Termination
                                </a>
                                <a
                                    href="#changes"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Changes to Terms
                                </a>
                                <a
                                    href="#contact"
                                    className="block text-sm text-ink-muted hover:text-leaf transition-colors"
                                >
                                    Contact Us
                                </a>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Acceptance of Terms */}
                        <Card id="acceptance">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-leaf"/>
                                    Acceptance of Terms
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate max-w-none">
                                <p>
                                    By downloading, installing, or using the Baby Care app (the &#34;Application&#34;), you
                                    agree to be bound by
                                    these Terms and Conditions (&#34;Terms&#34;). These Terms constitute a legally binding
                                    agreement between you
                                    and D.work (&#34;we&#34;, &#34;us&#34;, or &#34;our&#34;).
                                </p>
                                <p>
                                    If you do not agree to these Terms, please do not use the Application. Your
                                    continued use of the
                                    Application constitutes acceptance of any modifications to these Terms.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Use of Service */}
                        <Card id="use-of-service">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-shield"/>
                                    Use of Service
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-slate max-w-none">
                                    <p>
                                        The Baby Care app is designed to help parents and caregivers track and manage
                                        baby care activities.
                                        The service is provided  and is intended for personal, non-commercial use
                                        only.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-sprout-soft rounded-lg">
                                        <h4 className="font-semibold text-leaf mb-2">Permitted
                                            Uses</h4>
                                        <ul className="text-sm text-leaf space-y-1">
                                            <li>• Track baby feeding schedules</li>
                                            <li>• Monitor sleep patterns</li>
                                            <li>• Record diaper changes</li>
                                            <li>• Log growth measurements</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-sky-soft rounded-lg">
                                        <h4 className="font-semibold text-ink mb-2">Service
                                            Features</h4>
                                        <ul className="text-sm text-shield space-y-1">
                                            <li>• Data synchronization</li>
                                            <li>• Reminder notifications</li>
                                            <li>• Progress tracking</li>
                                            <li>• Export capabilities</li>
                                        </ul>
                                    </div>
                                </div>

                                <div
                                    className="bg-honey-soft border border-honey rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="h-5 w-5 text-honey-ink mt-0.5"/>
                                        <div>
                                            <h4 className="font-semibold text-honey-ink mb-1">Medical
                                                Disclaimer</h4>
                                            <p className="text-sm text-honey-ink">
                                                This app is not a substitute for professional medical advice, diagnosis,
                                                or treatment. Always
                                                consult with qualified healthcare providers regarding your baby&#39;s health
                                                and development.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Accounts */}
                        <Card id="user-accounts">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-coral-strong"/>
                                    User Accounts and Responsibilities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-slate max-w-none">
                                    <p>
                                        To access certain features of the Application, you may be required to create an
                                        account. You are
                                        responsible for maintaining the confidentiality of your account information.
                                    </p>
                                </div>

                                <div
                                    className="bg-blush-soft border border-coral rounded-lg p-4">
                                    <h4 className="font-semibold text-coral-strong mb-3">Your
                                        Responsibilities</h4>
                                    <ul className="text-sm text-coral-strong space-y-2">
                                        <li>• Provide accurate and complete information</li>
                                        <li>• Maintain the security of your login credentials</li>
                                        <li>• Notify us immediately of any unauthorized access</li>
                                        <li>• Use the service in compliance with applicable laws</li>
                                        <li>• Respect the privacy and rights of other users</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Prohibited Uses */}
                        <Card id="prohibited-uses">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Ban className="h-5 w-5 text-danger"/>
                                    Prohibited Uses
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-slate max-w-none">
                                    <p>
                                        You agree not to use the Application for any unlawful purpose or in any way that
                                        could damage,
                                        disable, or impair the service.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div
                                        className="p-4 bg-danger-soft border border-danger/30 rounded-lg">
                                        <h4 className="font-semibold text-danger mb-2">Strictly
                                            Prohibited</h4>
                                        <ul className="text-sm text-danger space-y-1">
                                            <li>• Reverse engineering the app</li>
                                            <li>• Distributing malware or viruses</li>
                                            <li>• Attempting unauthorized access</li>
                                            <li>• Violating intellectual property rights</li>
                                        </ul>
                                    </div>
                                    <div
                                        className="p-4 bg-blush-soft border border-coral rounded-lg">
                                        <h4 className="font-semibold text-coral-strong mb-2">Misuse
                                            Examples</h4>
                                        <ul className="text-sm text-coral-strong space-y-1">
                                            <li>• Commercial use without permission</li>
                                            <li>• Sharing false or misleading information</li>
                                            <li>• Interfering with other users</li>
                                            <li>• Automated data collection</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Intellectual Property */}
                        <Card id="intellectual-property">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Copyright className="h-5 w-5 text-shield"/>
                                    Intellectual Property Rights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-slate max-w-none">
                                    <p>
                                        The Application and its original content, features, and functionality are and
                                        will remain the
                                        exclusive property of D.work and its licensors. The service is protected by
                                        copyright, trademark, and
                                        other laws.
                                    </p>
                                </div>

                                <div
                                    className="bg-sky-soft border border-sky rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Copyright className="h-5 w-5 text-shield mt-0.5"/>
                                        <div>
                                            <h4 className="font-semibold text-ink mb-2">Protected
                                                Elements</h4>
                                            <ul className="text-sm text-shield space-y-1">
                                                <li>• Application design and user interface</li>
                                                <li>• Software code and algorithms</li>
                                                <li>• Trademarks, logos, and branding</li>
                                                <li>• Content, text, and graphics</li>
                                                <li>• Database structure and organization</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Disclaimers & Limitation */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card id="disclaimers">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <AlertTriangle className="h-5 w-5 text-honey-ink"/>
                                        Disclaimers
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-slate max-w-none">
                                    <p>
                                        The Application is provided on an &#34;AS IS&#34; and &#34;AS
                                        AVAILABLE&#34; basis. We make no
                                        representations or
                                        warranties of any kind, express or implied, regarding the use or results of the
                                        Application.
                                    </p>
                                    <p className="text-sm">
                                        We do not warrant that the service will be uninterrupted, secure, or error-free.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card id="limitation">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-ink-muted"/>
                                        Limitation of Liability
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="prose prose-slate max-w-none">
                                    <p>
                                        In no event shall D.work be liable for any indirect, incidental, special,
                                        consequential, or punitive
                                        damages arising out of your use of the Application.
                                    </p>
                                    <p className="text-sm">
                                        Our total liability shall not exceed the amount paid by you, if any, for using
                                        the Application.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Termination */}
                        <Card id="termination">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Gavel className="h-5 w-5 text-danger"/>
                                    Termination
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="prose prose-slate max-w-none">
                                    <p>
                                        We may terminate or suspend your access to the Application immediately, without
                                        prior notice or
                                        liability, for any reason, including breach of these Terms.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div
                                        className="p-4 bg-danger-soft border border-danger/30 rounded-lg">
                                        <h4 className="font-semibold text-danger mb-2">Grounds for
                                            Termination</h4>
                                        <ul className="text-sm text-danger space-y-1">
                                            <li>• Violation of these Terms</li>
                                            <li>• Fraudulent or illegal activity</li>
                                            <li>• Abuse of the service</li>
                                            <li>• Non-payment of fees (if applicable)</li>
                                        </ul>
                                    </div>
                                    <div
                                        className="p-4 bg-sky-soft border border-sky rounded-lg">
                                        <h4 className="font-semibold text-ink mb-2">Upon
                                            Termination</h4>
                                        <ul className="text-sm text-shield space-y-1">
                                            <li>• Access to the app will cease</li>
                                            <li>• Data may be deleted</li>
                                            <li>• License to use is revoked</li>
                                            <li>• Certain provisions survive</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Changes to Terms */}
                        <Card id="changes">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-leaf"/>
                                    Changes to Terms
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-slate max-w-none">
                                <p>
                                    We reserve the right to modify or replace these Terms at any time. If a revision is
                                    material, we will
                                    try to provide at least 30 days notice prior to any new terms taking effect.
                                </p>
                                <p>
                                    Your continued use of the Application after any such changes constitutes your
                                    acceptance of the new
                                    Terms. If you do not agree to the new Terms, please stop using the Application.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card
                            id="contact"
                            className="bg-sprout-soft border-sprout"
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-leaf"/>
                                    Contact Us
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div
                                    className="flex items-center gap-4 p-4 bg-card rounded-lg border">
                                    <div className="p-2 bg-sprout-soft rounded-full">
                                        <Mail className="h-5 w-5 text-leaf"/>
                                    </div>
                                    <div>
                                        <p className="font-medium text-ink">Questions about these
                                            terms?</p>
                                        <a
                                            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_URL}`}
                                            className="text-leaf hover:text-leaf font-medium"
                                        >
                                            {process.env.NEXT_PUBLIC_EMAIL_URL}
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <p className="text-sm text-ink-muted">
                                        <strong>Governing Law:</strong> These Terms shall be governed by and construed
                                        in accordance with
                                        the laws of [Your Jurisdiction], without regard to its conflict of law
                                        provisions.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Separator/>

                        {/* Footer */}
                        <div className="text-center py-6">
                            <p className="text-sm text-ink-muted">
                                These terms and conditions are effective as of May 28, 2025. Last updated: May 28, 2025.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TermsOfService",
                        name: "Terms and Conditions",
                        url: "https://yourdomain.com/terms-and-conditions",
                        datePublished: "2025-05-28",
                        publisher: {
                            "@type": "Organization",
                            name: "D.work",
                            url: "https://yourdomain.com",
                            contactPoint: {
                                "@type": "ContactPoint",
                                email: process.env.NEXT_PUBLIC_EMAIL_URL,
                                contactType: "customer support",
                            },
                        },
                    }),
                }}
            />
        </div>
    )
}
