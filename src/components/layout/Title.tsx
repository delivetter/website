import { motion } from "framer-motion";

export default function Title({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 py-6"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-blue-100/50 rounded-xl"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-20 -ml-10 -mt-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-20 -mr-10 -mb-10"></div>

            <div className="relative z-10">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {title}
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>

                {subtitle && (
                    <p className="text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
