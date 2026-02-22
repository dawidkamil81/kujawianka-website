'use client'

import { motion } from 'framer-motion'
// 1. Dodajemy import typu PortableTextBlock
import { PortableText } from 'next-sanity'
import type { PortableTextBlock } from 'next-sanity'

// 2. Aby było czysto, wyciągam typ wiersza tabeli do osobnego interfejsu
interface TableRow {
  _key: string
  isHeader: boolean
  cells: string[]
}

interface TableSectionProps {
  data: {
    heading?: string
    layout: 'full' | 'text-left' | 'text-right'
    // 3. Zmieniamy any[] na PortableTextBlock[]
    content?: PortableTextBlock[]
    tableRows?: TableRow[]
  }
}

// 4. Wyciągamy TableComponent na zewnątrz i przekazujemy tableRows jako props
const TableComponent = ({ tableRows }: { tableRows?: TableRow[] }) => (
  <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl">
    <div className="overflow-x-auto">
      {' '}
      {/* Scroll na mobile */}
      <table className="w-full border-collapse text-left">
        <tbody>
          {tableRows?.map((row, rowIndex) => (
            <tr
              key={row._key || rowIndex}
              className={`border-b border-white/5 transition-colors hover:bg-white/5 ${row.isHeader ? 'bg-club-green/10' : 'even:bg-white/[0.02]'} ${rowIndex === tableRows.length - 1 ? 'border-b-0' : ''} `}
            >
              {row.cells?.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`p-4 text-sm md:p-5 md:text-base ${
                    row.isHeader
                      ? 'font-montserrat font-black tracking-wider text-emerald-400 uppercase'
                      : 'font-medium text-gray-300'
                  } `}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {(!tableRows || tableRows.length === 0) && (
      <div className="p-8 text-center text-gray-500 italic">
        Brak danych w tabeli
      </div>
    )}
  </div>
)

// 5. Wyciągamy TextComponent na zewnątrz i przekazujemy content jako props
const TextComponent = ({ content }: { content?: PortableTextBlock[] }) => (
  <div className="flex flex-col gap-6">
    <div className="prose prose-invert max-w-none text-base leading-relaxed text-gray-400 md:text-lg">
      <PortableText value={content || []} />
    </div>
  </div>
)

export default function TableSection({ data }: TableSectionProps) {
  const isFullWidth = data.layout === 'full'
  const isTextRight = data.layout === 'text-right'

  return (
    <section className="relative z-10 container mx-auto px-4 py-20">
      {/* Nagłówek Sekcji */}
      {data.heading && (
        <div className="mb-12 flex items-center gap-4">
          <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
            {data.heading}
          </h3>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>
      )}

      {/* Layout Logic */}
      {isFullWidth ? (
        // Wariant 1: Pełna szerokość
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* 6. Używamy zewnetrznego komponentu */}
          <TableComponent tableRows={data.tableRows} />
        </motion.div>
      ) : (
        // Wariant 2 i 3: Siatka z tekstem
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Jeśli tekst po prawej, tabela pierwsza (order-1), w przeciwnym razie tekst pierwszy */}
          <motion.div
            className={`w-full ${isTextRight ? 'lg:order-1' : 'lg:order-2'}`}
            initial={{ opacity: 0, x: isTextRight ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TableComponent tableRows={data.tableRows} />
          </motion.div>

          <motion.div
            className={`w-full ${isTextRight ? 'lg:order-2' : 'lg:order-1'}`}
            initial={{ opacity: 0, x: isTextRight ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TextComponent content={data.content} />
          </motion.div>
        </div>
      )}
    </section>
  )
}
