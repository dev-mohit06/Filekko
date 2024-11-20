import { memo } from "react"
import {motion} from "framer-motion"

const BackgroundDecorations = memo(() => {
    return (
        <>
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 -left-4 w-96 h-96 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl"
                    animate={{
                        x: [-100, 100, -100],
                        y: [-100, 100, -100],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-1/4 -right-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl"
                    animate={{
                        x: [100, -100, 100],
                        y: [-50, 100, -50],
                        scale: [1.2, 1, 1.2],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl"
                    animate={{
                        x: [50, -50, 50],
                        y: [100, -100, 100],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 8,
                        ease: "linear"
                    }}
                />
            </div>
        </>
    )
})

export default BackgroundDecorations