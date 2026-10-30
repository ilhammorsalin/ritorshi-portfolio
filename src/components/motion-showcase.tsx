"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Text } from "@/components/ui/typography"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function MotionShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [show, setShow] = useState(true)

  return (
    <div className="flex flex-col gap-10">
      {/* Fade + slide on mount */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Text variant="h2">Fade &amp; slide in</Text>
      </motion.div>

      {/* Spring scale */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-fit"
      >
        <Button>Spring scale</Button>
      </motion.div>

      {/* Hover / tap interactions */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95 }}
        className="w-fit cursor-pointer rounded-md border border-border bg-card px-6 py-4"
      >
        <Text variant="p">Hover &amp; tap me</Text>
      </motion.div>

      {/* Staggered list */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="flex flex-col gap-2"
      >
        {["Alpha", "Bravo", "Charlie", "Delta"].map((item) => (
          <motion.li
            key={item}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            className="rounded-md border border-border bg-muted px-4 py-2"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>

      {/* Scroll-triggered */}
      <div ref={ref} className="min-h-[40vh]">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Scroll triggered</CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="muted">Reveals when scrolled into view.</Text>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AnimatePresence toggle */}
      <div className="flex flex-col gap-4">
        <Button onClick={() => setShow((s) => !s)}>
          {show ? "Hide" : "Show"} panel
        </Button>
        <AnimatePresence>
          {show && (
            <motion.div
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-md border border-border bg-card p-4"
            >
              <Text variant="p">Animated mount / unmount.</Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Infinite loop */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
      />

      {/* Drag */}
      <motion.div
        drag
        dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="w-fit cursor-grab rounded-md bg-primary px-6 py-3 text-primary-foreground"
      >
        Drag me
      </motion.div>
    </div>
  )
}