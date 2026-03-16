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
