'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, FileText, User } from 'lucide-react'

interface AuthorityMember {
  name: string
  group: 'management' | 'audit'
  role: string
  isVisible: boolean
}

export default function ClubAuthorities({
  authorities,
}: {
  authorities: AuthorityMember[]
}) {
  const managementBoard =
    authorities?.filter((m) => m.group === 'management' && m.isVisible) || []
  const auditCommittee =
    authorities?.filter((m) => m.group === 'audit' && m.isVisible) || []

  if (managementBoard.length === 0 && auditCommittee.length === 0) return null

  const cardClass =
    'p-6 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] rounded-2xl bg-[#121212] border border-white/5 hover:border-emerald-500/30 transition-colors group flex flex-col items-center justify-center text-center min-h-[280px]'

  return (
    <motion.section
      className="mb-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 p-3">
          <Briefcase className="text-emerald-500" size={32} />
        </div>
        <h2 className="font-montserrat mb-2 text-3xl font-black tracking-tight text-white uppercase">
          Władze <span className="text-emerald-500">Klubu</span>
        </h2>
        <div className="h-1 w-20 rounded-full bg-emerald-500" />
      </div>

      {managementBoard.length > 0 && (
        <div className="mb-20">
          <h3 className="mb-8 flex items-center justify-center gap-3 text-center text-2xl font-bold tracking-widest text-white uppercase opacity-90">
            <Users className="text-emerald-500" size={24} /> Zarząd Klubu
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {managementBoard.map((member, idx) => (
              <div key={idx} className={cardClass}>
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:scale-110">
                  <User
                    className="text-gray-400 transition-colors group-hover:text-emerald-500"
                    size={40}
                  />
                </div>
                <h4 className="mb-1 text-lg font-bold text-white">
                  {member.name}
                </h4>
                <p className="text-sm font-bold tracking-wider text-emerald-500 uppercase">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {auditCommittee.length > 0 && (
        <div>
          <h3 className="mb-8 flex items-center justify-center gap-3 text-center text-2xl font-bold tracking-widest text-white uppercase opacity-90">
            <FileText className="text-emerald-500" size={24} /> Komisja
            Rewizyjna
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {auditCommittee.map((member, idx) => (
              <div key={idx} className={cardClass}>
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:scale-110">
                  <User
                    className="text-gray-400 transition-colors group-hover:text-emerald-500"
                    size={40}
                  />
                </div>
                <h4 className="mb-1 text-lg font-bold text-white">
                  {member.name}
                </h4>
                <p className="text-sm font-bold tracking-wider text-emerald-500 uppercase">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  )
}
