'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { PortableText, type PortableTextBlock } from 'next-sanity'
import SplitColorTitle from '@/components/ui/SplitColorTitle'

interface ClubHistoryProps {
  title: string
  content: PortableTextBlock[]
  imageUrl?: string
}

const portableTextComponents = {
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    'white-text': ({ children }: { children?: React.ReactNode }) => (
      <span className="text-white">{children}</span>
    ),
  },
}

// Funkcja procesująca tekst (kolorowanie pierwszego słowa)
const processHistoryContent = (content: PortableTextBlock[]) => {
  if (!content || content.length === 0) return content
  const newContent = JSON.parse(JSON.stringify(content))
  const firstBlock = newContent[0]
  if (firstBlock._type === 'block' && firstBlock.children?.length > 0) {
    const firstSpan = firstBlock.children[0]
    if (firstSpan._type === 'span' && firstSpan.text) {
      const spaceIndex = firstSpan.text.trim().indexOf(' ')
      if (spaceIndex !== -1) {
        const firstWord = firstSpan.text.substring(0, spaceIndex)
        const restOfText = firstSpan.text.substring(spaceIndex)
        firstBlock.children.shift()
        firstBlock.children.unshift(
          {
            _type: 'span',
            _key: `${firstSpan._key}-bold`,
            text: firstWord,
            marks: ['strong', 'white-text'],
          },
          {
            _type: 'span',
            _key: `${firstSpan._key}-rest`,
            text: restOfText,
            marks: firstSpan.marks || [],
          },
        )
      }
    }
  }
  return newContent
}

export default function ClubHistory({
  title,
  content,
  imageUrl,
}: ClubHistoryProps) {
  const enrichedContent = processHistoryContent(content)

  return (
    <motion.section
      className="mb-32 grid grid-cols-1 items-center gap-12 border-b border-white/5 pb-20 lg:grid-cols-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-club-green/10 border-club-green/20 rounded-lg border p-2">
            <Shield className="text-club-green" size={24} />
          </div>
          <h2 className="font-montserrat text-2xl font-black tracking-tight text-white uppercase">
            <SplitColorTitle text={title || 'Historia i Misja'} />
          </h2>
        </div>
        <div className="prose prose-invert max-w-none space-y-4 text-base leading-relaxed text-gray-400 md:text-lg">
          <PortableText
            value={enrichedContent}
            components={portableTextComponents}
          />
        </div>
      </div>
      <div className="group relative order-1 lg:order-2">
        <div className="from-club-green/20 absolute inset-0 rounded-3xl bg-gradient-to-tr to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl lg:aspect-[4/3]">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Historia Kujawianki"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </motion.section>
  )
}
