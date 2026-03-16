    notifications: Notification[]
    unreadCount: number
    onMarkRead: (id: string) => void
    onHamburger: () => void
  }

  export default function Topbar({ notifications, unreadCount, onMarkRead, onHamburger }: TopbarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const { user, clearAuth } = useAuthStore()
    const [notifOpen, setNotifOpen] = useState(false)
    const [userOpen, setUserOpen] = useState(false)
    const notifRef = useRef<HTMLDivElement>(null)
    const userRef = useRef<HTMLDivElement>(null)

