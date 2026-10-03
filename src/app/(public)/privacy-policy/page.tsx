import React from 'react';
import { AlertTriangle, Calendar, CheckCircle, Eye, FileText, Lock, Mail, Shield, Users, Building2, Baby, MapPin, Bell, ExternalLink } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-surface-sunken">
            {/* Header Section */}
            <div className="bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-sky-soft rounded-full">
                                <Shield className="h-8 w-8 text-shield"/>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-ink mb-4">Privacy Policy</h1>
                        <p className="text-xl text-ink-muted max-w-3xl mx-auto">
                            We value your trust and are committed to protecting the privacy and security of your personal information.
                        </p>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                                <Calendar className="h-4 w-4 text-ink-muted"/>
                                <span className="text-sm font-medium text-ink">Effective: 1st January 2026</span>
                            </div>
                        </div>
                        <p className="text-sm text-ink-muted mt-4 max-w-2xl mx-auto">
                            By using our website or services, you agree to the practices described in this Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Table of Contents */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 bg-card rounded-lg border border-border p-6">
                            <h3 className="text-lg font-semibold text-ink mb-4">Contents</h3>
                            <div className="space-y-2">
                                {[
                                    { id: "information-collect", label: "Information We Collect" },
                                    { id: "how-we-use", label: "How We Use Information" },
                                    { id: "vaccination-disclaimer", label: "Vaccination Disclaimer" },
                                    { id: "sharing", label: "Sharing of Information" },
                                    { id: "security", label: "Data Security" },
                                    { id: "retention", label: "Data Retention" },
                                    { id: "rights", label: "Your Rights" },
                                    { id: "children", label: "Children's Privacy" },
                                    { id: "vendors", label: "Vendor Responsibilities" },
                                    { id: "third-party", label: "Third-Party Links" },
                                    { id: "changes", label: "Policy Changes" },
                                    { id: "contact", label: "Contact Us" },
                                ].map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="block text-sm text-ink-muted hover:text-shield transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Introduction */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <p className="text-ink-muted">
                                Welcome to <strong>thebabycareapp.com</strong> (&quot;The Baby Care App&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). This Privacy Policy explains how we collect, use, store, and protect your data when you use our platform.
                            </p>
                        </div>

                        {/* Information Collection */}
                        <div id="information-collect" className="bg-card rounded-lg border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
                                    <FileText className="h-6 w-6 text-shield"/>
                                    1. Information We Collect
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-ink mb-4">a. Information You Provide</h3>
                                    
                                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                                        <div className="p-4 bg-sky-soft border border-sky rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Users className="h-5 w-5 text-shield"/>
                                                <h4 className="font-semibold text-ink">Parent/Guardian</h4>
                                            </div>
                                            <ul className="text-sm text-ink-muted space-y-1">
                                                <li>• Name</li>
                                                <li>• Email address</li>
                                                <li>• Phone number</li>
                                                <li>• Location (city/district)</li>
                                            </ul>
                                        </div>

                                        <div className="p-4 bg-blush-soft border border-coral rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Baby className="h-5 w-5 text-coral-strong"/>
                                                <h4 className="font-semibold text-ink">Baby Information</h4>
                                            </div>
                                            <ul className="text-sm text-ink-muted space-y-1">
                                                <li>• Baby&apos;s name</li>
                                                <li>• Gender</li>
                                                <li>• Date of birth</li>
                                            </ul>
                                        </div>

                                        <div className="p-4 bg-blush-soft border border-coral rounded-lg">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Building2 className="h-5 w-5 text-coral-strong"/>
                                                <h4 className="font-semibold text-ink">Vendor Information</h4>
                                            </div>
                                            <ul className="text-sm text-ink-muted space-y-1">
                                                <li>• Business name</li>
                                                <li>• Contact details</li>
                                                <li>• Product listings</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-ink mb-3">b. Automatically Collected Information</h3>
                                    <div className="p-4 bg-muted rounded-lg">
                                        <ul className="text-ink-muted space-y-1">
                                            <li>• IP address</li>
                                            <li>• Browser type and device information</li>
                                            <li>• Pages visited and usage data</li>
                                        </ul>
                                        <p className="text-sm text-ink-muted mt-3">
                                            This data helps us improve performance and user experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Information */}
                        <div id="how-we-use" className="bg-card rounded-lg border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
                                    <CheckCircle className="h-6 w-6 text-leaf"/>
                                    2. How We Use Your Information
                                </h2>
                            </div>
                            <div className="p-6">
                                <p className="text-ink-muted mb-4">We use the collected information to:</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {[
                                        "Create and manage user accounts",
                                        "Display vaccination schedules based on Government of Nepal guidelines",
                                        "Help parents locate nearby health centers",
                                        "Enable vendors to list and sell baby care products",
                                        "Improve platform features and user experience",
                                        "Communicate important updates and service notifications"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-3 bg-sprout-soft rounded-lg">
                                            <CheckCircle className="h-5 w-5 text-leaf mt-0.5 flex-shrink-0"/>
                                            <span className="text-sm text-ink-muted">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 p-4 bg-honey-soft border border-honey rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="h-5 w-5 text-honey-ink mt-0.5"/>
                                        <p className="text-sm font-semibold text-honey-ink">
                                            We do not use baby data for advertising purposes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vaccination Disclaimer */}
                        <div id="vaccination-disclaimer" className="bg-card rounded-lg border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
                                    <AlertTriangle className="h-6 w-6 text-coral-strong"/>
                                    3. Vaccination Information Disclaimer
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="p-4 bg-blush-soft border-l-4 border-coral-strong rounded">
                                    <p className="text-ink-muted">
                                        Vaccination schedules displayed on the platform are based on publicly available <strong>Government of Nepal</strong> guidelines. This information is provided for educational and reminder purposes only and should not replace professional medical advice. Parents are advised to consult certified healthcare professionals for medical decisions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sharing Information */}
                        <div id="sharing" className="bg-card rounded-lg border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
                                    <Users className="h-6 w-6 text-coral-strong"/>
                                    4. Sharing of Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="p-4 bg-danger-soft border border-danger/30 rounded-lg">
                                    <p className="font-semibold text-danger">
                                        We do not sell or rent personal data.
                                    </p>
                                </div>
                                <p className="text-ink-muted">We may share information only in the following cases:</p>
                                <ul className="space-y-2">
                                    {[
                                        "With trusted service providers (hosting, analytics, payment processing) strictly for platform operation",
                                        "With vendors only as necessary to complete transactions",
                                        "If required by law or government authorities in Nepal"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-ink-muted">
                                            <span className="text-coral-strong font-bold">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-sm text-ink-muted italic">
                                    All third parties are required to maintain confidentiality and data protection standards.
                                </p>
                            </div>
                        </div>

                        {/* Data Security & Retention */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div id="security" className="bg-card rounded-lg border border-border">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                                        <Lock className="h-5 w-5 text-danger"/>
                                        5. Data Security
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-ink-muted mb-3">
                                        We take reasonable measures to protect your data:
                                    </p>
                                    <ul className="space-y-2 mb-3">
                                        <li className="flex items-center gap-2 text-sm text-ink-muted">
                                            <Shield className="h-4 w-4 text-leaf"/>
                                            Secure servers
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-ink-muted">
                                            <Lock className="h-4 w-4 text-leaf"/>
                                            Encrypted communication (HTTPS)
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-ink-muted">
                                            <Eye className="h-4 w-4 text-leaf"/>
                                            Limited access to sensitive data
                                        </li>
                                    </ul>
                                    <p className="text-sm text-ink-muted italic">
                                        No system is 100% secure. We encourage users to protect their login credentials.
                                    </p>
                                </div>
                            </div>

                            <div id="retention" className="bg-card rounded-lg border border-border">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                                        <Calendar className="h-5 w-5 text-coral-strong"/>
                                        6. Data Retention
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-ink-muted mb-3">
                                        We retain your personal information only as long as necessary to:
                                    </p>
                                    <ul className="space-y-1 mb-3">
                                        {["Provide services", "Comply with legal obligations", "Resolve disputes"].map((item, idx) => (
                                            <li key={idx} className="text-sm text-ink-muted">• {item}</li>
                                        ))}
                                    </ul>
                                    <p className="text-sm font-semibold text-shield">
                                        You may request deletion of your account and associated data at any time.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Your Rights */}
                        <div id="rights" className="bg-card rounded-lg border border-border">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
                                    <Shield className="h-6 w-6 text-leaf"/>
                                    7. Your Rights
                                </h2>
                            </div>
                            <div className="p-6">
                                <p className="text-ink-muted mb-4">As a user, you have the right to:</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {[
                                        "Access your personal data",
                                        "Update or correct inaccurate information",
                                        "Request deletion of your data",
                                        "Withdraw consent where applicable"
                                    ].map((right, idx) => (
                                        <div key={idx} className="p-3 bg-sprout-soft border border-sprout rounded-lg">
                                            <p className="text-sm text-ink-muted">{right}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-ink-muted mt-4">
                                    To exercise these rights, contact us using the details below.
                                </p>
                            </div>
                        </div>

                        {/* Children's Privacy & Vendors */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div id="children" className="bg-card rounded-lg border border-border">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                                        <Baby className="h-5 w-5 text-coral-strong"/>
                                        8. Children&apos;s Privacy
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-ink-muted">
                                        The platform collects baby information only from parents or legal guardians. We do not knowingly collect data directly from children.
                                    </p>
                                </div>
                            </div>

                            <div id="vendors" className="bg-card rounded-lg border border-border">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-shield"/>
                                        9. Vendor Responsibilities
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-ink-muted mb-2">Vendors are responsible for:</p>
                                    <ul className="text-sm text-ink-muted space-y-1 mb-3">
                                        <li>• Accuracy of product information</li>
                                        <li>• Compliance with laws and regulations</li>
                                        <li>• Protecting customer data</li>
                                    </ul>
                                    <p className="text-xs text-ink-muted italic">
                                        The Baby Care App is not responsible for vendor misuse of data outside the platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Third-Party & Changes */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div id="third-party" className="bg-card rounded-lg border border-border">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                                        <ExternalLink className="h-5 w-5 text-shield"/>
                                        10. Third-Party Links
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-ink-muted">
                                        Our platform may contain links to external websites or services (e.g., maps). We are not responsible for the privacy practices of those third parties.
                                    </p>
                                </div>
                            </div>

                            <div id="changes" className="bg-card rounded-lg border border-border">
                                <div className="p-6 border-b border-border">
                                    <h2 className="text-xl font-bold text-ink flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-honey-ink"/>
                                        11. Changes to This Policy
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <p className="text-ink-muted">
                                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage users to review this policy periodically.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div id="contact" className="bg-sky-soft border border-sky rounded-lg">
                            <div className="p-6 border-b border-sky">
                                <h2 className="text-2xl font-bold text-ink flex items-center gap-3">
                                    <Mail className="h-6 w-6 text-shield"/>
                                    12. Contact Us
                                </h2>
                            </div>
                            <div className="p-6">
                                <p className="text-ink-muted mb-4">
                                    If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:
                                </p>
                                <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-sky">
                                    <div className="p-3 bg-sky-soft rounded-full">
                                        <MapPin className="h-6 w-6 text-shield"/>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-ink mb-1">Visit our website</p>
                                        <a
                                            href="https://thebabycareapp.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-shield hover:text-shield font-medium flex items-center gap-1"
                                        >
                                            https://thebabycareapp.com
                                            <ExternalLink className="h-4 w-4"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-border pt-6">
                            <div className="text-center">
                                <p className="text-sm text-ink-muted">
                                    © 2026 The Baby Care App. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}