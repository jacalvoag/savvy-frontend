
// ─── Helper ────────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      id="copy-invite-code"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-gray-300 hover:text-white text-xs font-medium transition-all"
        {/* ── Group Header ───────────────────────────────────────── */}
        {loading && !groupDetail ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        ) : groupDetail ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">{groupDetail.nombre}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">Invite code:</span>
                <code className="font-mono text-sm text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-lg">
                  {groupDetail.inviteCode}
                </code>
                          ) : (
                            <span className="text-white font-semibold">{member.streakWeeks}w 🔥</span>
                          )}
                        </td>
                        {/* Share (contributions tab only) */}
                        {lbTab === 'contributions' && (
                          <td className="px-4 py-3 text-right hidden sm:table-cell">
                            <span className="text-lime-400 text-xs font-medium">{member.porcentaje.toFixed(1)}%</span>
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
