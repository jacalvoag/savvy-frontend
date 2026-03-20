  const cls = sizeClass[size]

  if (src) {
    return (
      <div className={`${cls} rounded-full overflow-hidden shrink-0`}>
        <Image src={src} alt={nombre} width={px} height={px} className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div
      className={`${cls} rounded-full bg-lime-400 text-black font-bold flex items-center justify-center shrink-0 select-none`}
      aria-label={nombre}
    >
