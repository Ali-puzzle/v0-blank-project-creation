"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Users,
  Gift,
  FileText,
  Plane,
  Clock,
  BookOpen,
  ChevronDown,
  ArrowRight,
  MapPin,
  CalendarDays,
  Briefcase,
  UserCheck,
  Plus,
  X,
  Timer,
  User,
  Building,
  Mail,
  Phone,
  Award,
  Bell,
  HeadphonesIcon,
  Search,
  Home,
  Edit,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Shield,
  Car,
  Dumbbell,
  Film,
  ShoppingBag,
  Coffee,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Upload,
  Ticket,
} from "lucide-react"

// Define the applications data structure
interface Application {
  name: string
  description: string
  icon: React.ElementType // Use React.ElementType for component types
}

// Define the applications array
const applications: Application[] = [
  { name: "Ticket Management", description: "Access ticket management", icon: FileText },
  { name: "Task Management", description: "Access task management", icon: Timer },
  { name: "Asset Management", description: "Access asset management", icon: ShoppingBag },
  { name: "Document Management", description: "Access document management", icon: BookOpen },
  { name: "Contract Management", description: "Access contract management", icon: FileText },
  { name: "Project Management", description: "Access project management", icon: Briefcase },
  { name: "Courier Module", description: "Access courier module", icon: Plane },
  { name: "HR Module", description: "Access hr module", icon: UserCheck },
]

export default function EmployeeDashboard() {
  const [showApplications, setShowApplications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [certificateFilter, setCertificateFilter] = useState("all")
  const [expertAreaFilter, setExpertAreaFilter] = useState("all")
  const [certificateNameFilter, setCertificateNameFilter] = useState("all")
  const [showExpiredCertificates, setShowExpiredCertificates] = useState(false)
  const [showNonExpiredCertificates, setShowNonExpiredCertificates] = useState(false)
  const [activeLeaveTab, setActiveLeaveTab] = useState("my-leaves")
  const [leaveTimeFilter, setLeaveTimeFilter] = useState("all")
  const [leaveTypeFilter, setLeaveTypeFilter] = useState("all")
  const [leaveStatusFilter, setLeaveStatusFilter] = useState("all")
  const [showLeaveDetails, setShowLeaveDetails] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState(null)
  const [showNewLeaveRequest, setShowNewLeaveRequest] = useState(false)
  const [showNewOvertimeRequest, setShowNewOvertimeRequest] = useState(false)
  const [activeOvertimeTab, setActiveOvertimeTab] = useState("my-requests")
  const [overtimeTimeFilter, setOvertimeTimeFilter] = useState("all")
  const [overtimeStatusFilter, setOvertimeStatusFilter] = useState("all")
  const [showOvertimeDetails, setShowOvertimeDetails] = useState(false)
  const [selectedOvertime, setSelectedOvertime] = useState(null)

  const [partnerSearch, setPartnerSearch] = useState("")
  const [partnerFilter, setPartnerFilter] = useState("all")

  // Business Trips State
  const [activeBusinessTripTab, setActiveBusinessTripTab] = useState("my-requests")
  const [businessTripTimeFilter, setBusinessTripTimeFilter] = useState("all")
  const [businessTripTypeFilter, setBusinessTripTypeFilter] = useState("all")
  const [businessTripStatusFilter, setBusinessTripStatusFilter] = useState("all")
  const [showBusinessTripDetails, setShowBusinessTripDetails] = useState(false)
  const [selectedBusinessTrip, setSelectedBusinessTrip] = useState(null)
  const [showNewBusinessTripRequest, setShowNewBusinessTripRequest] = useState(false)

  const [newBusinessTripForm, setNewBusinessTripForm] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    type: "",
    purpose: "",
    projectName: "",
    uploadedFile: null as File | null,
  })

  const [showNewMeeting, setShowNewMeeting] = useState(false)
  const [showNewItemModal, setShowNewItemModal] = useState(false)
  const [newItemType, setNewItemType] = useState("task") // task, ticket, file
  const [newItemForm, setNewItemForm] = useState({
    // Task fields
    subject: "",
    body: "",
    assignedUser: "",
    project: "",
    type: "task", // user story, bug, task
    relatedNumber: "",
    tag: "",
    priority: "medium",
    // Ticket fields
    group: "",
    attachment: null as File | null,
    site: "google", // google, microsoft
    // File sharing fields
    name: "",
    sharedPersons: "",
    notes: "",
  })

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      subject: "Team Standup",
      startTime: "2024-12-15T09:00:00",
      endTime: "2024-12-15T09:30:00",
      organizer: "John Doe",
      location: "Conference Room A",
      attendees: ["Alice Smith", "Bob Johnson"],
    },
    {
      id: 2,
      subject: "Project Review",
      startTime: "2024-12-15T14:00:00",
      endTime: "2024-12-15T15:30:00",
      organizer: "Sarah Wilson",
      location: "Meeting Room B",
      attendees: ["John Doe", "Mike Davis"],
    },
    {
      id: 3,
      subject: "Client Presentation",
      startTime: "2024-12-16T10:00:00",
      endTime: "2024-12-16T11:00:00",
      organizer: "Emily Brown",
      location: "Main Conference Room",
      attendees: ["John Doe", "Sarah Wilson", "Client Team"],
    },
  ])

  const [newMeeting, setNewMeeting] = useState({
    attendees: [],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    subject: "",
    selectedRoom: "",
    location: "",
  })

  const availableRooms = [
    { id: 1, name: "Conference Room A", capacity: 10, available: true },
    { id: 2, name: "Meeting Room B", capacity: 6, available: true },
    { id: 3, name: "Main Conference Room", capacity: 20, available: false },
    { id: 4, name: "Small Meeting Room", capacity: 4, available: true },
    { id: 5, name: "Board Room", capacity: 12, available: true },
  ]

  const employeeList = [
    "John Doe",
    "Alice Smith",
    "Bob Johnson",
    "Sarah Wilson",
    "Mike Davis",
    "Emily Brown",
    "David Lee",
    "Lisa Chen",
  ]

  const [todos, setTodos] = useState([
    { id: 1, text: "Complete quarterly performance review", completed: false },
    { id: 2, text: "Update project documentation", completed: true },
    { id: 3, text: "Schedule team meeting for next week", completed: false },
    { id: 4, text: "Review budget proposals", completed: false },
  ])

  const partners = [
    {
      name: "Microsoft",
      degree: "platinum",
      description: "Strategic technology partnership for cloud solutions and enterprise software.",
    },
    {
      name: "Amazon Web Services",
      degree: "gold",
      description: "Cloud infrastructure and services partnership for scalable solutions.",
    },
    {
      name: "Google Cloud",
      degree: "silver",
      description: "AI and machine learning solutions partnership for advanced analytics.",
    },
    { name: "Oracle", degree: "gold", description: "Database and enterprise application solutions partnership." },
    {
      name: "Salesforce",
      degree: "bronze",
      description: "CRM and customer experience platform integration partnership.",
    },
    { name: "IBM", degree: "silver", description: "Enterprise solutions and consulting services partnership." },
  ]

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(partnerSearch.toLowerCase())
    const matchesDegree = partnerFilter === "all" || partner.degree === partnerFilter
    return matchesSearch && matchesDegree
  })

  const employees = [
    {
      id: 1,
      name: "Sarah",
      surname: "Johnson",
      patronicName: "Elizabeth",
      position: "Engineering Manager",
      department: "Engineering",
      status: "Active",
      email: "sarah.johnson@xgroup.com",
      phone: "+1 (555) 987-6543",
      office: "New York Office - Floor 16",
      reportsTo: "Michael Brown",
      workDuration: "5 years 3 months",
      certificates: [
        {
          name: "PMP Certification",
          issueDate: "2022-01-15",
          expireDate: "2025-01-15",
          organization: "PMI",
          expertArea: "Project Management",
          validUntil: "2025-01-15",
          isExpired: false,
        },
      ],
    },
    {
      id: 2,
      name: "Michael",
      surname: "Brown",
      patronicName: "David",
      position: "CTO",
      department: "Engineering",
      status: "Active",
      email: "michael.brown@xgroup.com",
      phone: "+1 (555) 111-2222",
      office: "New York Office - Floor 17",
      reportsTo: "CEO",
      workDuration: "8 years 1 month",
      certificates: [
        {
          name: "AWS Solutions Architect",
          issueDate: "2021-03-10",
          expireDate: "2024-03-10",
          organization: "AWS",
          expertArea: "Cloud Architecture",
          validUntil: "2024-03-10",
          isExpired: true,
        },
      ],
    },
    {
      id: 3,
      name: "Emily",
      surname: "Davis",
      patronicName: "Rose",
      position: "Marketing Specialist",
      department: "Marketing",
      status: "Away",
      email: "emily.davis@xgroup.com",
      phone: "+1 (555) 333-4444",
      office: "New York Office - Floor 12",
      reportsTo: "Sarah Johnson",
      workDuration: "2 years 8 months",
      certificates: [
        {
          name: "Google Analytics Certified",
          issueDate: "2023-06-01",
          expireDate: "2024-06-01",
          organization: "Google",
          expertArea: "Digital Marketing",
          validUntil: "2024-06-01",
          isExpired: true,
        },
      ],
    },
    {
      id: 4,
      name: "James",
      surname: "Wilson",
      patronicName: "Robert",
      position: "HR Specialist",
      department: "Human Resources",
      status: "Active",
      email: "james.wilson@xgroup.com",
      phone: "+1 (555) 555-6666",
      office: "New York Office - Floor 10",
      reportsTo: "Michael Brown",
      workDuration: "3 years 2 months",
      certificates: [
        {
          name: "SHRM-CP",
          issueDate: "2022-09-15",
          expireDate: "2025-09-15",
          organization: "SHRM",
          expertArea: "Human Resources",
          validUntil: "2025-09-15",
          isExpired: false,
        },
      ],
    },
    {
      id: 5,
      name: "Lisa",
      surname: "Anderson",
      patronicName: "Marie",
      position: "Financial Analyst",
      department: "Finance",
      status: "Active",
      email: "lisa.anderson@xgroup.com",
      phone: "+1 (555) 777-8888",
      office: "New York Office - Floor 14",
      reportsTo: "Sarah Johnson",
      workDuration: "4 years 6 months",
      certificates: [
        {
          name: "CFA Level II",
          issueDate: "2021-12-01",
          expireDate: "2026-12-01",
          organization: "CFA Institute",
          expertArea: "Financial Analysis",
          validUntil: "2026-12-01",
          isExpired: false,
        },
      ],
    },
  ]

  const leaveRequests = [
    {
      id: 1,
      type: "Paid Annual",
      startDate: "2024-12-20",
      endDate: "2024-12-25",
      startTime: "09:00",
      endTime: "17:00",
      status: "Approved",
      requestDate: "2024-11-15",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [
        { name: "Sarah Johnson", role: "Manager", status: "Approved", date: "2024-11-16" },
        { name: "HR Department", role: "HR", status: "Approved", date: "2024-11-17" },
      ],
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2024-11-28",
      endDate: "2024-11-29",
      startTime: "09:00",
      endTime: "17:00",
      status: "Waiting for approval",
      requestDate: "2024-11-27",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Pending", date: null }],
    },
    {
      id: 3,
      type: "Day-off",
      startDate: "2024-12-02",
      endDate: "2024-12-02",
      startTime: "14:00",
      endTime: "17:00",
      status: "Rejected",
      requestDate: "2024-11-20",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Rejected", date: "2024-11-21" }],
    },
    {
      id: 4,
      type: "Children Care Leave",
      startDate: "2024-12-15",
      endDate: "2024-12-16",
      startTime: "09:00",
      endTime: "17:00",
      status: "Canceled",
      requestDate: "2024-11-10",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Canceled", date: "2024-11-12" }],
    },
    {
      id: 5,
      type: "Unpaid",
      startDate: "2024-12-30",
      endDate: "2025-01-02",
      startTime: "09:00",
      endTime: "17:00",
      status: "Approved",
      requestDate: "2024-11-01",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [
        { name: "Sarah Johnson", role: "Manager", status: "Approved", date: "2024-11-02" },
        { name: "HR Department", role: "HR", status: "Approved", date: "2024-11-03" },
      ],
    },
  ]

  const sentRequests = [
    {
      id: 6,
      type: "Paid Annual",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      startTime: "09:00",
      endTime: "17:00",
      status: "Waiting for approval",
      requestDate: "2024-11-25",
      requester: { name: "Emily", surname: "Davis", patronicName: "Rose", position: "Marketing Specialist" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Pending", date: null }],
    },
    {
      id: 7,
      type: "Sick Leave",
      startDate: "2024-11-30",
      endDate: "2024-12-01",
      startTime: "09:00",
      endTime: "17:00",
      status: "Approved",
      requestDate: "2024-11-29",
      requester: { name: "James", surname: "Wilson", patronicName: "Robert", position: "HR Specialist" },
      approvalRoute: [
        { name: "Sarah Johnson", role: "Manager", status: "Approved", date: "2024-11-29" },
        { name: "HR Department", role: "HR", status: "Approved", date: "2024-11-30" },
      ],
    },
  ]

  const overtimeRequests = [
    {
      id: 1,
      taskId: "TASK-001",
      startDate: "2024-12-20",
      endDate: "2024-12-20",
      startTime: "18:00",
      endTime: "22:00",
      status: "Approved",
      requestDate: "2024-11-15",
      reason: "Critical bug fix for production deployment",
      priority: "High",
      urgency: "Critical",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [
        { name: "Sarah Johnson", role: "Manager", status: "Approved", date: "2024-11-16" },
        { name: "HR Department", role: "HR", status: "Approved", date: "2024-11-17" },
      ],
    },
    {
      id: 2,
      taskId: "TASK-002",
      startDate: "2024-11-28",
      endDate: "2024-11-29",
      startTime: "19:00",
      endTime: "23:00",
      status: "Waiting for approval",
      requestDate: "2024-11-27",
      reason: "Database migration for new feature",
      priority: "Medium",
      urgency: "High",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Pending", date: null }],
    },
    {
      id: 3,
      taskId: "TASK-003",
      startDate: "2024-12-02",
      endDate: "2024-12-02",
      startTime: "17:00",
      endTime: "20:00",
      status: "Rejected",
      requestDate: "2024-11-20",
      reason: "Additional testing for security patch",
      priority: "Low",
      urgency: "Medium",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Rejected", date: "2024-11-21" }],
    },
    {
      id: 4,
      taskId: "TASK-004",
      startDate: "2024-12-15",
      endDate: "2024-12-16",
      startTime: "18:00",
      endTime: "22:00",
      status: "Canceled",
      requestDate: "2024-11-10",
      reason: "Performance optimization for mobile app",
      priority: "Medium",
      urgency: "Low",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Canceled", date: "2024-11-12" }],
    },
    {
      id: 5,
      taskId: "TASK-005",
      startDate: "2024-12-30",
      endDate: "2025-01-02",
      startTime: "16:00",
      endTime: "20:00",
      status: "Approved",
      requestDate: "2024-11-01",
      reason: "Year-end system maintenance",
      priority: "High",
      urgency: "Medium",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [
        { name: "Sarah Johnson", role: "Manager", status: "Approved", date: "2024-11-02" },
        { name: "HR Department", role: "HR", status: "Approved", date: "2024-11-03" },
      ],
    },
  ]

  const sentOvertimeRequests = [
    {
      id: 6,
      taskId: "TASK-006",
      startDate: "2024-12-10",
      endDate: "2024-12-12",
      startTime: "17:00",
      endTime: "21:00",
      status: "Waiting for approval",
      requestDate: "2024-11-25",
      reason: "Client presentation preparation",
      priority: "High",
      urgency: "High",
      requester: { name: "Emily", surname: "Davis", patronicName: "Rose", position: "Marketing Specialist" },
      approvalRoute: [{ name: "Sarah Johnson", role: "Manager", status: "Pending", date: null }],
    },
    {
      id: 7,
      taskId: "TASK-007",
      startDate: "2024-11-30",
      endDate: "2024-12-01",
      startTime: "18:00",
      endTime: "22:00",
      status: "Approved",
      requestDate: "2024-11-29",
      reason: "Server maintenance and updates",
      priority: "Medium",
      urgency: "Medium",
      requester: { name: "James", surname: "Wilson", patronicName: "Robert", position: "HR Specialist" },
      approvalRoute: [
        { name: "Sarah Johnson", role: "Manager", status: "Approved", date: "2024-11-29" },
        { name: "HR Department", role: "HR", status: "Approved", date: "2024-11-30" },
      ],
    },
  ]

  // Business Trips Data (Example Data)
  const businessTripRequests = [
    {
      id: 1,
      type: "Local",
      startDate: "2024-12-05",
      endDate: "2024-12-07",
      startTime: "09:00",
      endTime: "17:00",
      status: "Approved",
      requestDate: "2024-11-20",
      country: "USA",
      city: "Chicago",
      purpose: "Client meeting for Project Alpha",
      projectName: "Project Alpha",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [
        { approver: "Sarah Johnson", role: "Manager", status: "approved", date: "2024-11-21" },
        { approver: "HR Department", role: "HR", status: "approved", date: "2024-11-22" },
      ],
    },
    {
      id: 2,
      type: "Foreign",
      startDate: "2025-01-10",
      endDate: "2025-01-15",
      startTime: "09:00",
      endTime: "17:00",
      status: "Waiting for Approval",
      requestDate: "2024-12-01",
      country: "Germany",
      city: "Berlin",
      purpose: "Attend industry conference",
      projectName: "Internal Project",
      requester: { name: "John", surname: "Doe", patronicName: "Michael", position: "Senior Developer" },
      approvalRoute: [{ approver: "Sarah Johnson", role: "Manager", status: "pending", date: null }],
    },
  ]

  const sentBusinessTripRequests = [
    {
      id: 3,
      type: "Local",
      startDate: "2024-12-10",
      endDate: "2024-12-11",
      startTime: "10:00",
      endTime: "16:00",
      status: "Waiting for Approval",
      requestDate: "2024-11-28",
      country: "USA",
      city: "San Francisco",
      purpose: "Partnership meeting",
      projectName: "Project Beta",
      requester: { name: "Emily", surname: "Davis", patronicName: "Rose", position: "Marketing Specialist" },
      approvalRoute: [{ approver: "Sarah Johnson", role: "Manager", status: "pending", date: null }],
    },
  ]

  // Business Trips Data (Example Data)
  const businessTrips = [
    {
      id: 1,
      requester: { name: "John", surname: "Doe", position: "Senior Developer" },
      destination: "New York",
      purpose: "Client Meeting",
      startDate: "2024-12-05",
      endDate: "2024-12-07",
      status: "Approved",
    },
    {
      id: 2,
      requester: { name: "Emily", surname: "Davis", position: "Marketing Specialist" },
      destination: "London",
      purpose: "Conference",
      startDate: "2025-01-10",
      endDate: "2025-01-15",
      status: "Pending",
    },
    {
      id: 3,
      requester: { name: "James", surname: "Wilson", position: "HR Specialist" },
      destination: "Chicago",
      purpose: "Training",
      startDate: "2024-11-20",
      endDate: "2024-11-22",
      status: "Rejected",
    },
    {
      id: 4,
      requester: { name: "Sarah", surname: "Johnson", position: "Engineering Manager" },
      destination: "San Francisco",
      purpose: "Project Review",
      startDate: "2024-12-15",
      endDate: "2024-12-17",
      status: "Approved",
    },
  ]

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.patronicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesCertificate =
      certificateFilter === "all" || employee.certificates.some((cert) => cert.name.includes(certificateFilter))
    const matchesExpertArea =
      expertAreaFilter === "all" || employee.certificates.some((cert) => cert.expertArea === expertAreaFilter)

    const matchesCertificateName =
      certificateNameFilter === "all" || employee.certificates.some((cert) => cert.name === certificateNameFilter)

    // Check certificate expiration
    const now = new Date()
    const hasExpiredCerts = employee.certificates.some((cert) => new Date(cert.expireDate) < now)
    const hasNonExpiredCerts = employee.certificates.some((cert) => new Date(cert.expireDate) >= now)

    let matchesExpiration = true
    if (showExpiredCertificates && !showNonExpiredCertificates) {
      matchesExpiration = hasExpiredCerts
    } else if (!showExpiredCertificates && showNonExpiredCertificates) {
      matchesExpiration = hasNonExpiredCerts
    } else if (showExpiredCertificates && showNonExpiredCertificates) {
      matchesExpiration = true
    } else if (!showExpiredCertificates && !showNonExpiredCertificates) {
      matchesExpiration = true
    }

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesCertificate &&
      matchesExpertArea &&
      matchesCertificateName &&
      matchesExpiration
    )
  })

  const getFilteredLeaves = (requests) => {
    return requests.filter((leave) => {
      const matchesType = leaveTypeFilter === "all" || leave.type === leaveTypeFilter
      const matchesStatus = leaveStatusFilter === "all" || leave.status === leaveStatusFilter

      let matchesTime = true
      if (leaveTimeFilter !== "all") {
        const requestDate = new Date(leave.requestDate)
        const now = new Date()

        if (leaveTimeFilter === "this-week") {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= weekAgo
        } else if (leaveTimeFilter === "this-month") {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= monthAgo
        } else if (leaveTimeFilter === "this-year") {
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= yearAgo
        }
      }

      return matchesType && matchesStatus && matchesTime
    })
  }

  const getFilteredOvertimes = (requests) => {
    return requests.filter((overtime) => {
      const matchesStatus = overtimeStatusFilter === "all" || overtime.status === overtimeStatusFilter

      let matchesTime = true
      if (overtimeTimeFilter !== "all") {
        const requestDate = new Date(overtime.requestDate)
        const now = new Date()

        if (overtimeTimeFilter === "this-week") {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= weekAgo
        } else if (overtimeTimeFilter === "this-month") {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= monthAgo
        } else if (overtimeTimeFilter === "this-year") {
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= yearAgo
        }
      }

      return matchesStatus && matchesTime
    })
  }

  // Business Trips Filter Logic
  const getFilteredBusinessTrips = (requests) => {
    return requests.filter((trip) => {
      const matchesType = businessTripTypeFilter === "all" || trip.type === businessTripTypeFilter
      const matchesStatus = businessTripStatusFilter === "all" || trip.status === businessTripStatusFilter

      let matchesTime = true
      if (businessTripTimeFilter !== "all") {
        const requestDate = new Date(trip.requestDate)
        const now = new Date()

        if (businessTripTimeFilter === "week") {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= weekAgo
        } else if (businessTripTimeFilter === "month") {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= monthAgo
        } else if (businessTripTimeFilter === "year") {
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          matchesTime = requestDate >= yearAgo
        }
      }

      return matchesType && matchesStatus && matchesTime
    })
  }

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee)
    setShowEmployeeDetails(true)
  }

  const handleReportsToClick = (reportsToName) => {
    const manager = employees.find((emp) => `${emp.name} ${emp.surname}` === reportsToName)
    if (manager) {
      setSelectedEmployee(manager)
      setShowEmployeeDetails(true) // Ensure details dialog is shown for the manager
    }
  }

  const handleLeaveAction = (leaveId, action) => {
    console.log(`${action} leave request ${leaveId}`)
  }

  const handleLeaveDetails = (leave) => {
    setSelectedLeave(leave)
    setShowLeaveDetails(true)
  }

  const handleOvertimeAction = (overtimeId, action) => {
    console.log(`${action} overtime request ${overtimeId}`)
  }

  const handleOvertimeDetails = (overtime) => {
    setSelectedOvertime(overtime)
    setShowOvertimeDetails(true)
  }

  // Business Trips Handlers
  const handleBusinessTripAction = (tripId, action) => {
    console.log(`${action} business trip request ${tripId}`)
  }

  const handleBusinessTripDetails = (trip) => {
    setSelectedBusinessTrip(trip)
    setShowBusinessTripDetails(true)
  }

  // Task List State and Handlers
  const [taskSearch, setTaskSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")

  const tasks = [
    { id: "001", title: "Implement user authentication", type: "task", state: "done", tags: ["backend", "api"] },
    { id: "002", title: "Design login page UI", type: "user-story", state: "done", tags: ["frontend", "ui"] },
    {
      id: "003",
      title: "Fix button alignment on mobile",
      type: "bug",
      state: "review",
      tags: ["frontend", "ui", "urgent"],
    },
    {
      id: "004",
      title: "Optimize database queries",
      type: "task",
      state: "in-progress",
      tags: ["backend", "database"],
    },
    { id: "005", title: "Develop user profile page", type: "user-story", state: "open", tags: ["frontend", "api"] },
    { id: "006", title: "Set up CI/CD pipeline", type: "epic", state: "open", tags: ["backend", "devops"] },
    {
      id: "007",
      title: "Refactor authentication module",
      type: "task",
      state: "in-progress",
      tags: ["backend", "api"],
    },
    { id: "008", title: "Add loading spinners to forms", type: "task", state: "open", tags: ["frontend", "ui"] },
    { id: "009", title: "Fix broken image links", type: "bug", state: "open", tags: ["frontend"] },
    {
      id: "010",
      title: "Implement password reset functionality",
      type: "task",
      state: "done",
      tags: ["backend", "api"],
    },
  ]

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      task.id.toLowerCase().includes(taskSearch.toLowerCase())
    const matchesType = typeFilter === "all" || task.type === typeFilter
    const matchesState = stateFilter === "all" || task.state === stateFilter
    const matchesTag = tagFilter === "all" || task.tags.includes(tagFilter)
    return matchesSearch && matchesType && matchesState && matchesTag
  })

  if (currentPage === "task-list") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <h1 className="text-xl font-semibold">Assigned Tasks</h1>
          </div>
          <Button variant="ghost" className="text-white hover:bg-blue-600" onClick={() => setCurrentPage("dashboard")}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Task List Content */}
        <div className="p-6">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by title or ID..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="user-story">User Story</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={stateFilter} onValueChange={setStateFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tagFilter} onValueChange={setTagFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="ui">UI</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Task Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">ID</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Title</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left p-4 font-semibold text-gray-900">State</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Tags</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-mono text-sm text-gray-600">#{task.id}</td>
                        <td className="p-4 font-medium text-gray-900">{task.title}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.type === "bug"
                                ? "bg-red-100 text-red-800"
                                : task.type === "task"
                                  ? "bg-blue-100 text-blue-800"
                                  : task.type === "epic"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.type === "user-story"
                              ? "User Story"
                              : task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.state === "open"
                                ? "bg-gray-100 text-gray-800"
                                : task.state === "in-progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : task.state === "review"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                          >
                            {task.state === "in-progress"
                              ? "In Progress"
                              : task.state.charAt(0).toUpperCase() + task.state.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentPage === "calendar") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
              <span>72°F</span>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-4 w-4" />
              <div className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span>John Doe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-blue-50 min-h-screen p-4">
            <div className="mb-8">
              <h2 className="text-blue-900 font-semibold mb-4">Navigation</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </button>
                <button
                  onClick={() => setCurrentPage("employees")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </button>
                {/* Added calendar page state and meeting management */}
                <button
                  onClick={() => setCurrentPage("calendar")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-white bg-blue-500 rounded-lg transition-colors"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </button>
                <button
                  onClick={() => setCurrentPage("discounts-benefits")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </button>
                <button
                  onClick={() => setCurrentPage("leaves")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </button>
                <button
                  onClick={() => setCurrentPage("overtimes")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </button>
                <button
                  onClick={() => setCurrentPage("business-trips")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-blue-900">Calendar</h1>
              <Button onClick={() => setShowNewMeeting(true)} className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create New Meeting
              </Button>
            </div>

            {/* Calendar Month View */}
            <div className="bg-white border border-blue-200 rounded-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">December 2024</h2>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {/* Week Headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center font-semibold text-blue-700 bg-blue-50">
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNumber = i - 6 + 1 // Starting from Dec 1st (assuming Dec 1st is on Sunday)
                    const isCurrentMonth = dayNumber > 0 && dayNumber <= 31
                    const dayMeetings = meetings.filter((meeting) => {
                      const meetingDate = new Date(meeting.startTime)
                      return meetingDate.getDate() === dayNumber && meetingDate.getMonth() === 11 // December
                    })

                    return (
                      <div
                        key={i}
                        className={`min-h-[100px] p-2 border border-blue-100 ${
                          isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        {isCurrentMonth && (
                          <>
                            <div className="font-semibold text-blue-900 mb-1">{dayNumber}</div>
                            <div className="space-y-1">
                              {dayMeetings.map((meeting) => (
                                <div
                                  key={meeting.id}
                                  className="bg-blue-100 text-blue-800 text-xs p-1 rounded cursor-pointer hover:bg-blue-200"
                                  title={`${meeting.subject}\n${new Date(meeting.startTime).toLocaleTimeString()} - ${new Date(meeting.endTime).toLocaleTimeString()}\nOrganizer: ${meeting.organizer}\nLocation: ${meeting.location}`}
                                >
                                  <div className="font-semibold truncate">{meeting.subject}</div>
                                  <div className="truncate">
                                    {new Date(meeting.startTime).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}{" "}
                                    -
                                    {new Date(meeting.endTime).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                  <div className="truncate text-blue-600">📍 {meeting.location}</div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Meeting Details Section */}
              <div className="border-t border-blue-200 pt-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Upcoming Meetings</h3>
                <div className="space-y-4">
                  {meetings.slice(0, 3).map((meeting) => (
                    <Card key={meeting.id} className="border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-900 mb-2">{meeting.subject}</h4>
                            <div className="space-y-1 text-sm text-blue-600">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {new Date(meeting.startTime).toLocaleDateString()} •
                                  {new Date(meeting.startTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  -
                                  {new Date(meeting.endTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>Organizer: {meeting.organizer}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{meeting.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>Attendees: {meeting.attendees.join(", ")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Meeting Dialog */}
        <Dialog open={showNewMeeting} onOpenChange={setShowNewMeeting}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-900">Create New Meeting</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              {/* Attendees */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Attendees</label>
                <Select
                  value={newMeeting.attendees}
                  onValueChange={(value) =>
                    setNewMeeting({ ...newMeeting, attendees: Array.isArray(value) ? value : [value] })
                  }
                  multiple
                >
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Select attendees" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeeList.map((employee) => (
                      <SelectItem key={employee} value={employee}>
                        {employee}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    className="border-blue-200"
                    value={newMeeting.startDate}
                    onChange={(e) => setNewMeeting({ ...newMeeting, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Date</label>
                  <Input
                    type="date"
                    className="border-blue-200"
                    value={newMeeting.endDate}
                    onChange={(e) => setNewMeeting({ ...newMeeting, endDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Time</label>
                  <Input
                    type="time"
                    className="border-blue-200"
                    value={newMeeting.startTime}
                    onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Time</label>
                  <Input
                    type="time"
                    className="border-blue-200"
                    value={newMeeting.endTime}
                    onChange={(e) => setNewMeeting({ ...newMeeting, endTime: e.target.value })}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Subject</label>
                <Input
                  placeholder="Enter meeting subject"
                  className="border-blue-200"
                  value={newMeeting.subject}
                  onChange={(e) => setNewMeeting({ ...newMeeting, subject: e.target.value })}
                />
              </div>

              {/* Room Finder */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Room Finder</label>
                <Select
                  value={newMeeting.selectedRoom}
                  onValueChange={(value) => setNewMeeting({ ...newMeeting, selectedRoom: value })}
                >
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Select available room" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRooms
                      .filter((room) => room.available)
                      .map((room) => (
                        <SelectItem key={room.id} value={room.name}>
                          {room.name} (Capacity: {room.capacity})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Location</label>
                <Input
                  placeholder="Enter location details"
                  className="border-blue-200"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => {
                    // Add meeting logic here
                    const combinedDateTime = `${newMeeting.startDate}T${newMeeting.startTime}`
                    const endDateTime = `${newMeeting.endDate}T${newMeeting.endTime}`
                    setMeetings([
                      ...meetings,
                      {
                        id: meetings.length + 1,
                        subject: newMeeting.subject,
                        startTime: combinedDateTime,
                        endTime: endDateTime,
                        organizer: "John Doe", // Assuming current user is the organizer
                        location: newMeeting.selectedRoom || newMeeting.location,
                        attendees: newMeeting.attendees,
                      },
                    ])
                    setShowNewMeeting(false)
                    setNewMeeting({
                      attendees: [],
                      startDate: "",
                      endDate: "",
                      startTime: "",
                      endTime: "",
                      subject: "",
                      selectedRoom: "",
                      location: "",
                    })
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Create Meeting
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowNewMeeting(false)}
                  className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (currentPage === "overtimes") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>
            <div className="flex items-center gap-2">
              <span>72°F</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <HeadphonesIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-4 w-4" />
              </Button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">John Doe</h3>
                      <p className="text-sm text-blue-600">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Name:</span>
                      <span className="text-sm text-blue-900">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Surname:</span>
                      <span className="text-sm text-blue-900">Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Patronic name:</span>
                      <span className="text-sm text-blue-900">Michael</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Position:</span>
                      <span className="text-sm text-blue-900">Senior Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Status:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setShowProfile(false)
                      setShowProfileDetails(true)
                    }}
                  >
                    View profile
                  </Button>
                </div>
              )}
            </div>
            <span>John Doe</span>
          </div>
        </div>

        <div className="flex">
          <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
              <nav className="space-y-2">
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("employees")}
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </div>
                {/* Added calendar page state and meeting management */}
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("discounts-benefits")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>Policies and Procedures</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("leaves")}
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                  onClick={() => setCurrentPage("overtimes")}
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("business-trips")}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <Building className="h-4 w-4" />
                  <span>About company</span>
                </div>
              </nav>
            </div>

            <div
              className="bg-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={() => setShowApplications(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1 rounded">
                    <div className="w-4 h-4 bg-blue-700 rounded"></div>
                  </div>
                  <span className="font-medium text-white">Switch Apps</span>
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <main className="flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-blue-900">Overtime Management</h1>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowNewOvertimeRequest(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <Tabs value={activeOvertimeTab} onValueChange={setActiveOvertimeTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="my-requests">My Requests</TabsTrigger>
                <TabsTrigger value="sent-requests">Sent Requests</TabsTrigger>
                <TabsTrigger value="all-requests">All Requests</TabsTrigger>
              </TabsList>

              <div className="flex gap-4 my-6">
                <Select value={overtimeTimeFilter} onValueChange={setOvertimeTimeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={overtimeStatusFilter} onValueChange={setOvertimeStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Waiting for approval">Waiting for approval</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="my-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Task ID</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Time Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredOvertimes(overtimeRequests).map((overtime) => (
                            <tr key={overtime.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4 text-blue-900 font-medium">{overtime.taskId}</td>
                              <td className="p-4 text-blue-700">
                                {overtime.startDate} - {overtime.endDate}
                              </td>
                              <td className="p-4 text-blue-700">
                                {overtime.startTime} - {overtime.endTime}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    overtime.status === "Approved"
                                      ? "bg-green-500"
                                      : overtime.status === "Rejected"
                                        ? "bg-red-500"
                                        : overtime.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {overtime.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-500 text-blue-500 hover:bg-blue-50 bg-transparent"
                                    onClick={() => handleOvertimeAction(overtime.id, "edit")}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                                    onClick={() => handleOvertimeAction(overtime.id, "cancel")}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-500 text-green-500 hover:bg-green-50 bg-transparent"
                                    onClick={() => handleOvertimeAction(overtime.id, "download")}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleOvertimeDetails(overtime)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sent-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Requester</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Task ID</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredOvertimes(sentOvertimeRequests).map((overtime) => (
                            <tr key={overtime.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {overtime.requester.name} {overtime.requester.surname}{" "}
                                    {overtime.requester.patronicName}
                                  </p>
                                  <p className="text-sm text-blue-600">{overtime.requester.position}</p>
                                </div>
                              </td>
                              <td className="p-4 text-blue-900 font-medium">{overtime.taskId}</td>
                              <td className="p-4 text-blue-700">
                                {overtime.startDate} - {overtime.endDate}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    overtime.status === "Approved"
                                      ? "bg-green-500"
                                      : overtime.status === "Rejected"
                                        ? "bg-red-500"
                                        : overtime.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {overtime.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  {overtime.status === "Waiting for approval" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-green-500 hover:bg-green-600"
                                        onClick={() => handleOvertimeAction(overtime.id, "approve")}
                                      >
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                                        onClick={() => handleOvertimeAction(overtime.id, "reject")}
                                      >
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleOvertimeDetails(overtime)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Requester</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Task ID</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredOvertimes([...overtimeRequests, ...sentOvertimeRequests]).map((overtime) => (
                            <tr key={overtime.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {overtime.requester.name} {overtime.requester.surname}{" "}
                                    {overtime.requester.patronicName}
                                  </p>
                                  <p className="text-sm text-blue-600">{overtime.requester.position}</p>
                                </div>
                              </td>
                              <td className="p-4 text-blue-900 font-medium">{overtime.taskId}</td>
                              <td className="p-4 text-blue-700">
                                {overtime.startDate} - {overtime.endDate}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    overtime.status === "Approved"
                                      ? "bg-green-500"
                                      : overtime.status === "Rejected"
                                        ? "bg-red-500"
                                        : overtime.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {overtime.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Button
                                  size="sm"
                                  className="bg-blue-500 hover:bg-blue-600"
                                  onClick={() => handleOvertimeDetails(overtime)}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        <Dialog open={showOvertimeDetails} onOpenChange={setShowOvertimeDetails}>
          <DialogContent className="max-w-2xl bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Overtime Request Details</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowOvertimeDetails(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {selectedOvertime && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">Requester</label>
                    <p className="text-blue-900">
                      {selectedOvertime.requester.name} {selectedOvertime.requester.surname}{" "}
                      {selectedOvertime.requester.patronicName}
                    </p>
                    <p className="text-sm text-blue-600">{selectedOvertime.requester.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Task ID</label>
                    <p className="text-blue-900">{selectedOvertime.taskId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Date Range</label>
                    <p className="text-blue-900">
                      {selectedOvertime.startDate} - {selectedOvertime.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Time Range</label>
                    <p className="text-blue-900">
                      {selectedOvertime.startTime} - {selectedOvertime.endTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Priority</label>
                    <Badge
                      className={
                        selectedOvertime.priority === "High"
                          ? "bg-red-500"
                          : selectedOvertime.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }
                    >
                      {selectedOvertime.priority}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Urgency</label>
                    <Badge
                      className={
                        selectedOvertime.urgency === "Critical"
                          ? "bg-red-600"
                          : selectedOvertime.urgency === "High"
                            ? "bg-red-500"
                            : selectedOvertime.urgency === "Medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }
                    >
                      {selectedOvertime.urgency}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Request Date</label>
                    <p className="text-blue-900">{selectedOvertime.requestDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Status</label>
                    <Badge
                      className={
                        selectedOvertime.status === "Approved"
                          ? "bg-green-500"
                          : selectedOvertime.status === "Rejected"
                            ? "bg-red-500"
                            : selectedOvertime.status === "Canceled"
                              ? "bg-gray-500"
                              : "bg-yellow-500"
                      }
                    >
                      {selectedOvertime.status}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-blue-600">Reason</label>
                    <p className="text-blue-900">{selectedOvertime.reason}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-blue-600 mb-3 block">Approval Route</label>
                  <div className="space-y-3">
                    {selectedOvertime.approvalRoute.map((step, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">{step.name}</p>
                          <p className="text-sm text-blue-600">{step.role}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              step.status === "Approved"
                                ? "bg-green-500"
                                : step.status === "Rejected"
                                  ? "bg-red-500"
                                  : step.status === "Canceled"
                                    ? "bg-gray-500"
                                    : "bg-yellow-500"
                            }
                          >
                            {step.status}
                          </Badge>
                          {step.date && <p className="text-xs text-blue-500 mt-1">{step.date}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={showNewOvertimeRequest} onOpenChange={setShowNewOvertimeRequest}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">New Overtime Request</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewOvertimeRequest(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Reason</label>
                <textarea
                  className="w-full p-2 border border-blue-200 rounded-md resize-none h-20"
                  placeholder="Enter reason for overtime request..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Task Reference</label>
                <Input placeholder="Enter task reference..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Urgency</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => setShowNewOvertimeRequest(false)}
                >
                  Submit Request
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNewOvertimeRequest(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showApplications} onOpenChange={setShowApplications}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Available Applications</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowApplications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 p-4">
              {[
                { name: "Ticket Management", desc: "Access ticket management" },
                { name: "Task Management", desc: "Access task management" },
                { name: "Asset Management", desc: "Access asset management" },
                { name: "Document Management", desc: "Access document management" },
                { name: "Contract Management", desc: "Access contract management" },
                { name: "Project Management", desc: "Access project management" },
                { name: "Courier Module", desc: "Access courier module" },
                { name: "HR Module", desc: "Access hr module" },
              ].map((app) => (
                <Card
                  key={app.name}
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors border-blue-200"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 text-blue-900">{app.name}</h3>
                    <p className="text-sm text-blue-600">{app.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (currentPage === "leaves") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>
            <div className="flex items-center gap-2">
              <span>72°F</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <HeadphonesIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-4 w-4" />
              </Button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">John Doe</h3>
                      <p className="text-sm text-blue-600">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Name:</span>
                      <span className="text-sm text-blue-900">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Surname:</span>
                      <span className="text-sm text-blue-900">Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Patronic name:</span>
                      <span className="text-sm text-blue-900">Michael</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Position:</span>
                      <span className="text-sm text-blue-900">Senior Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Status:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setShowProfile(false)
                      setShowProfileDetails(true)
                    }}
                  >
                    View profile
                  </Button>
                </div>
              )}
            </div>
            <span>John Doe</span>
          </div>
        </div>

        <div className="flex">
          <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
              <nav className="space-y-2">
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("employees")}
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </div>
                {/* Added calendar page state and meeting management */}
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("discounts-benefits")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>Policies and Procedures</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                  onClick={() => setCurrentPage("leaves")}
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("overtimes")}
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("business-trips")}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <Building className="h-4 w-4" />
                  <span>About company</span>
                </div>
              </nav>
            </div>

            <div
              className="bg-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={() => setShowApplications(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1 rounded">
                    <div className="w-4 h-4 bg-blue-700 rounded"></div>
                  </div>
                  <span className="font-medium text-white">Switch Apps</span>
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <main className="flex-1 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-blue-900">Leave Management</h1>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowNewLeaveRequest(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <Tabs value={activeLeaveTab} onValueChange={setActiveLeaveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="my-leaves">My Leaves</TabsTrigger>
                <TabsTrigger value="sent-requests">Sent Requests</TabsTrigger>
                <TabsTrigger value="all-requests">All Requests</TabsTrigger>
              </TabsList>

              <div className="flex gap-4 my-6">
                <Select value={leaveTimeFilter} onValueChange={setLeaveTimeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Leave Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Paid Annual">Paid Annual</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                    <SelectItem value="Day-off">Day-off</SelectItem>
                    <SelectItem value="Children Care Leave">Children Care Leave</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={leaveStatusFilter} onValueChange={setLeaveStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Waiting for approval">Waiting for approval</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="my-leaves">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Leave Type</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Time Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredLeaves(leaveRequests).map((leave) => (
                            <tr key={leave.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4 text-blue-900 font-medium">{leave.type}</td>
                              <td className="p-4 text-blue-700">
                                {leave.startDate} - {leave.endDate}
                              </td>
                              <td className="p-4 text-blue-700">
                                {leave.startTime} - {leave.endTime}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    leave.status === "Approved"
                                      ? "bg-green-500"
                                      : leave.status === "Rejected"
                                        ? "bg-red-500"
                                        : leave.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {leave.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-500 text-blue-500 hover:bg-blue-50 bg-transparent"
                                    onClick={() => handleLeaveAction(leave.id, "edit")}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                                    onClick={() => handleLeaveAction(leave.id, "cancel")}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-500 text-green-500 hover:bg-green-50 bg-transparent"
                                    onClick={() => handleLeaveAction(leave.id, "download")}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleLeaveDetails(leave)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sent-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Requester</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Leave Type</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredLeaves(sentRequests).map((leave) => (
                            <tr key={leave.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {leave.requester.name} {leave.requester.surname} {leave.requester.patronicName}
                                  </p>
                                  <p className="text-sm text-blue-600">{leave.requester.position}</p>
                                </div>
                              </td>
                              <td className="p-4 text-blue-900 font-medium">{leave.type}</td>
                              <td className="p-4 text-blue-700">
                                {leave.startDate} - {leave.endDate}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    leave.status === "Approved"
                                      ? "bg-green-500"
                                      : leave.status === "Rejected"
                                        ? "bg-red-500"
                                        : leave.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {leave.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  {leave.status === "Waiting for approval" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-green-500 hover:bg-green-600"
                                        onClick={() => handleLeaveAction(leave.id, "approve")}
                                      >
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                                        onClick={() => handleLeaveAction(leave.id, "reject")}
                                      >
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleLeaveDetails(leave)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Requester</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Leave Type</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredLeaves([...leaveRequests, ...sentRequests]).map((leave) => (
                            <tr key={leave.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {leave.requester.name} {leave.requester.surname} {leave.requester.patronicName}
                                  </p>
                                  <p className="text-sm text-blue-600">{leave.requester.position}</p>
                                </div>
                              </td>
                              <td className="p-4 text-blue-900 font-medium">{leave.type}</td>
                              <td className="p-4 text-blue-700">
                                {leave.startDate} - {leave.endDate}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    leave.status === "Approved"
                                      ? "bg-green-500"
                                      : leave.status === "Rejected"
                                        ? "bg-red-500"
                                        : leave.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {leave.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Button
                                  size="sm"
                                  className="bg-blue-500 hover:bg-blue-600"
                                  onClick={() => handleLeaveDetails(leave)}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Details
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        {/* Leave Details Dialog */}
        <Dialog open={showLeaveDetails} onOpenChange={setShowLeaveDetails}>
          <DialogContent className="max-w-2xl bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Leave Request Details</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowLeaveDetails(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {selectedLeave && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">Requester</label>
                    <p className="text-blue-900">
                      {selectedLeave.requester.name} {selectedLeave.requester.surname}{" "}
                      {selectedLeave.requester.patronicName}
                    </p>
                    <p className="text-sm text-blue-600">{selectedLeave.requester.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Leave Type</label>
                    <p className="text-blue-900">{selectedLeave.type}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Date Range</label>
                    <p className="text-blue-900">
                      {selectedLeave.startDate} - {selectedLeave.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Time Range</label>
                    <p className="text-blue-900">
                      {selectedLeave.startTime} - {selectedLeave.endTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Request Date</label>
                    <p className="text-blue-900">{selectedLeave.requestDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Status</label>
                    <Badge
                      className={
                        selectedLeave.status === "Approved"
                          ? "bg-green-500"
                          : selectedLeave.status === "Rejected"
                            ? "bg-red-500"
                            : selectedLeave.status === "Canceled"
                              ? "bg-gray-500"
                              : "bg-yellow-500"
                      }
                    >
                      {selectedLeave.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-blue-600 mb-3 block">Approval Route</label>
                  <div className="space-y-3">
                    {selectedLeave.approvalRoute.map((step, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">{step.name}</p>
                          <p className="text-sm text-blue-600">{step.role}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              step.status === "Approved"
                                ? "bg-green-500"
                                : step.status === "Rejected"
                                  ? "bg-red-500"
                                  : step.status === "Canceled"
                                    ? "bg-gray-500"
                                    : "bg-yellow-500"
                            }
                          >
                            {step.status}
                          </Badge>
                          {step.date && <p className="text-xs text-blue-500 mt-1">{step.date}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (currentPage === "employees") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>
            <div className="flex items-center gap-2">
              <span>72°F</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <HeadphonesIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-4 w-4" />
              </Button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">John Doe</h3>
                      <p className="text-sm text-blue-600">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Name:</span>
                      <span className="text-sm text-blue-900">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Surname:</span>
                      <span className="text-sm text-blue-900">Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Patronic name:</span>
                      <span className="text-sm text-blue-900">Michael</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Position:</span>
                      <span className="text-sm text-blue-900">Senior Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Status:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setShowProfile(false)
                      setShowProfileDetails(true)
                    }}
                  >
                    View profile
                  </Button>
                </div>
              )}
            </div>
            <span>John Doe</span>
          </div>
        </div>

        <div className="flex">
          <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
              <nav className="space-y-2">
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                  onClick={() => setCurrentPage("employees")}
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </div>
                {/* Added calendar page state and meeting management */}
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("discounts-benefits")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>Policies and Procedures</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("leaves")}
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("overtimes")}
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("business-trips")}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <Building className="h-4 w-4" />
                  <span>About company</span>
                </div>
              </nav>
            </div>

            <div
              className="bg-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={() => setShowApplications(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1 rounded">
                    <div className="w-4 h-4 bg-blue-700 rounded"></div>
                  </div>
                  <span className="font-medium text-white">Switch Apps</span>
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <main className="flex-1 p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-blue-900 mb-4">Employees</h1>

              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-blue-500" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={expertAreaFilter} onValueChange={setExpertAreaFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Expert Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expert Areas</SelectItem>
                    <SelectItem value="Project Management">Project Management</SelectItem>
                    <SelectItem value="Cloud Architecture">Cloud Architecture</SelectItem>
                    <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                    <SelectItem value="Human Resources">Human Resources</SelectItem>
                    <SelectItem value="Financial Analysis">Financial Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 mb-6">
                <Select value={certificateNameFilter} onValueChange={setCertificateNameFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Certificate Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Certificates</SelectItem>
                    <SelectItem value="PMP Certification">PMP Certification</SelectItem>
                    <SelectItem value="AWS Solutions Architect">AWS Solutions Architect</SelectItem>
                    <SelectItem value="Google Analytics Certified">Google Analytics Certified</SelectItem>
                    <SelectItem value="SHRM-CP">SHRM-CP</SelectItem>
                    <SelectItem value="CFA Level II">CFA Level II</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="expired"
                      checked={showExpiredCertificates}
                      onCheckedChange={setShowExpiredCertificates}
                    />
                    <label htmlFor="expired" className="text-sm text-blue-700">
                      Show Expired Certificates
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="non-expired"
                      checked={showNonExpiredCertificates}
                      onCheckedChange={setShowNonExpiredCertificates}
                    />
                    <label htmlFor="non-expired" className="text-sm text-blue-700">
                      Show Non-Expired Certificates
                    </label>
                  </div>
                </div>
              </div>

              <Card className="bg-white border-blue-200">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-blue-50">
                        <tr>
                          <th className="text-left p-4 text-blue-900 font-semibold">Name</th>
                          <th className="text-left p-4 text-blue-900 font-semibold">Position</th>
                          <th className="text-left p-4 text-blue-900 font-semibold">Department</th>
                          <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                          <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmployees.map((employee) => (
                          <tr key={employee.id} className="border-t border-blue-100 hover:bg-blue-50">
                            <td className="p-4">
                              <div>
                                <p className="font-medium text-blue-900">
                                  {employee.name} {employee.surname} {employee.patronicName}
                                </p>
                              </div>
                            </td>
                            <td className="p-4 text-blue-700">{employee.position}</td>
                            <td className="p-4 text-blue-700">{employee.department}</td>
                            <td className="p-4">
                              <Badge className={employee.status === "Active" ? "bg-green-500" : "bg-yellow-500"}>
                                {employee.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => handleEmployeeClick(employee)}
                              >
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        <Dialog open={showEmployeeDetails} onOpenChange={setShowEmployeeDetails}>
          <DialogContent className="max-w-4xl bg-white border-blue-200 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Employee Details</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowEmployeeDetails(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {selectedEmployee && (
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-blue-600">Name</label>
                        <p className="text-blue-900">{selectedEmployee.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Surname</label>
                        <p className="text-blue-900">{selectedEmployee.surname}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Patronic Name</label>
                        <p className="text-blue-900">{selectedEmployee.patronicName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Active Status</label>
                        <Badge className={selectedEmployee.status === "Active" ? "bg-green-500" : "bg-yellow-500"}>
                          {selectedEmployee.status}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Position</label>
                        <p className="text-blue-900">{selectedEmployee.position}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">How long working in company</label>
                        <p className="text-blue-900">{selectedEmployee.workDuration}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-blue-600">Department Name</label>
                        <p className="text-blue-900">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Reports to</label>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-500 hover:text-blue-700"
                          onClick={() => handleReportsToClick(selectedEmployee.reportsTo)}
                        >
                          {selectedEmployee.reportsTo}
                        </Button>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Mail</label>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <p className="text-blue-900">{selectedEmployee.email}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Phone Number</label>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <p className="text-blue-900">{selectedEmployee.phone}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-600">Office Name</label>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-blue-500" />
                          <p className="text-blue-900">{selectedEmployee.office}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="certificates" className="space-y-4">
                  <div className="grid gap-4">
                    {selectedEmployee.certificates.map((cert, index) => (
                      <Card key={index} className="border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-blue-500" />
                                <h3 className="font-semibold text-blue-900">{cert.name}</h3>
                              </div>
                              <p className="text-sm text-blue-600">Expert Area: {cert.expertArea}</p>
                              <p className="text-sm text-blue-600">Valid Until: {cert.validUntil}</p>
                              <Badge className={cert.isExpired ? "bg-red-500" : "bg-green-500"}>
                                {cert.isExpired ? "Expired" : "Valid"}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>

        {/* Profile dropdown and other dialogs remain the same */}
        <Dialog open={showProfile && !showProfileDetails} onOpenChange={setShowProfile}>
          <DialogContent className="max-w-80 bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">User Profile</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">John Doe</h3>
                <p className="text-sm text-blue-600">Senior Developer</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-blue-600">Name:</span>
                <span className="text-sm text-blue-900">John</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-600">Surname:</span>
                <span className="text-sm text-blue-900">Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-600">Patronic name:</span>
                <span className="text-sm text-blue-900">Michael</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-600">Position:</span>
                <span className="text-sm text-blue-900">Senior Developer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-600">Status:</span>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => {
                setShowProfile(false)
                setShowProfileDetails(true)
              }}
            >
              View profile
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (currentPage === "discounts-benefits") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>
            <div className="flex items-center gap-2">
              <span>72°F</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <HeadphonesIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-4 w-4" />
              </Button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">John Doe</h3>
                      <p className="text-sm text-blue-600">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Name:</span>
                      <span className="text-sm text-blue-900">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Surname:</span>
                      <span className="text-sm text-blue-900">Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Patronic name:</span>
                      <span className="text-sm text-blue-900">Michael</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Position:</span>
                      <span className="text-sm text-blue-900">Senior Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Status:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setShowProfile(false)
                      setShowProfileDetails(true)
                    }}
                  >
                    View profile
                  </Button>
                </div>
              )}
            </div>
            <span>John Doe</span>
          </div>
        </div>

        <div className="flex">
          <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
              <nav className="space-y-2">
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("employees")}
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </div>
                {/* Added calendar page state and meeting management */}
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                  onClick={() => setCurrentPage("discounts-benefits")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>Policies and Procedures</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("leaves")}
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("overtimes")}
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("business-trips")}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <Building className="h-4 w-4" />
                  <span>About company</span>
                </div>
              </nav>
            </div>
            <div>
              <h2 className="text-blue-600 font-medium mb-4">Applications</h2>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setShowApplications(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Switch apps
              </Button>
            </div>
          </div>

          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-blue-900 mb-6">Discounts and Benefits</h1>

              {/* Partner Discounts Section */}
              <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Partner Discounts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Cinema Discount */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Film className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Cinema World</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">Get 25% off on all movie tickets</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download Coupon
                    </Button>
                  </div>

                  {/* Shopping Discount */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <ShoppingBag className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">MegaMall</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">15% discount on all purchases</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download Coupon
                    </Button>
                  </div>

                  {/* Restaurant Discount */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Coffee className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-blue-900">Gourmet Restaurant</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">20% off on dining experiences</p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      Download Coupon
                    </Button>
                  </div>
                </div>
              </div>

              {/* Company Benefits Section */}
              <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Company Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Insurance */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <h3 className="font-semibold text-green-900">Health Insurance</h3>
                    </div>
                    <p className="text-green-700 text-sm mb-3">Comprehensive health coverage for you and your family</p>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Apply Now</Button>
                  </div>

                  {/* Taxi Service */}
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Car className="h-6 w-6 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-900">Corporate Taxi Service</h3>
                    </div>
                    <p className="text-yellow-700 text-sm mb-3">Free taxi rides for business purposes</p>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">Apply Now</Button>
                  </div>

                  {/* Gym Subscription */}
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Dumbbell className="h-6 w-6 text-purple-600" />
                      <h3 className="font-semibold text-purple-900">Gym Membership</h3>
                    </div>
                    <p className="text-purple-700 text-sm mb-3">Access to premium fitness centers</p>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Apply Now</Button>
                  </div>

                  {/* Corporate Number */}
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Phone className="h-6 w-6 text-orange-600" />
                      <h3 className="font-semibold text-orange-900">Corporate Phone</h3>
                    </div>
                    <p className="text-orange-700 text-sm mb-3">Company mobile phone with unlimited calls</p>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Apply Now</Button>
                  </div>
                </div>
              </div>

              {/* My Current Subscriptions Section */}
              <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">My Current Subscriptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Corporate Number Subscription */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-6 w-6 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Corporate Phone</h3>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">Phone: +1 (555) 123-4567</p>
                    <Button
                      variant="outline"
                      className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      See My Tariff
                    </Button>
                  </div>

                  {/* Insurance Package Subscription */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-green-600" />
                        <h3 className="font-semibold text-green-900">Health Insurance</h3>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <p className="text-green-700 text-sm mb-3">Premium Family Package</p>
                    <Button
                      variant="outline"
                      className="w-full border-green-300 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      See Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* New Leave Request Dialog */}
        <Dialog open={showNewLeaveRequest} onOpenChange={setShowNewLeaveRequest}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">New Leave Request</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewLeaveRequest(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Request Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid Annual">Paid Annual</SelectItem>
                    <SelectItem value="Unpaid">Unpaid</SelectItem>
                    <SelectItem value="Day-off">Day-off</SelectItem>
                    <SelectItem value="Children Care Leave">Children Care Leave</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Time</label>
                  <Input type="time" />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Time</label>
                  <Input type="time" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => setShowNewLeaveRequest(false)}>
                  Submit Request
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowNewLeaveRequest(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showApplications} onOpenChange={setShowApplications}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Available Applications</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowApplications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 p-4">
              {applications.map((app) => (
                <Card
                  key={app.name}
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors border-blue-200"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 text-blue-900">{app.name}</h3>
                    <p className="text-sm text-blue-600">{app.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (currentPage === "business-trips") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>
            <div className="flex items-center gap-2">
              <span>72°F</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <HeadphonesIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-4 w-4" />
              </Button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">John Doe</h3>
                      <p className="text-sm text-blue-600">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Name:</span>
                      <span className="text-sm text-blue-900">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Surname:</span>
                      <span className="text-sm text-blue-900">Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Patronic name:</span>
                      <span className="text-sm text-blue-900">Michael</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Position:</span>
                      <span className="text-sm text-blue-900">Senior Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Status:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setShowProfile(false)
                      setShowProfileDetails(true)
                    }}
                  >
                    View profile
                  </Button>
                </div>
              )}
            </div>
            <span>John Doe</span>
          </div>
        </div>

        <div className="flex">
          <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
              <nav className="space-y-2">
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("employees")}
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </div>
                {/* Added calendar page state and meeting management */}
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("discounts-benefits")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>Policies and Procedures</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("leaves")}
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("overtimes")}
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                  onClick={() => setCurrentPage("business-trips")}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <Building className="h-4 w-4" />
                  <span>About company</span>
                </div>
              </nav>
            </div>

            <div
              className="bg-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={() => setShowApplications(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1 rounded">
                    <div className="w-4 h-4 bg-blue-700 rounded"></div>
                  </div>
                  <span className="font-medium text-white">Switch Apps</span>
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <main className="flex-1 p-6">
            {/* Adding New Request button to Business Trips page header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-900">Business Trips</h1>
              <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => setShowNewBusinessTripRequest(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>

            <Tabs value={activeBusinessTripTab} onValueChange={setActiveBusinessTripTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="my-requests">My Requests</TabsTrigger>
                <TabsTrigger value="sent-requests">Sent Requests</TabsTrigger>
                <TabsTrigger value="all-requests">All Requests</TabsTrigger>
              </TabsList>

              <div className="flex gap-4 my-6">
                <Select value={businessTripTimeFilter} onValueChange={setBusinessTripTimeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={businessTripTypeFilter} onValueChange={setBusinessTripTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trip Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Local">Local</SelectItem>
                    <SelectItem value="Foreign">Foreign</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={businessTripStatusFilter} onValueChange={setBusinessTripStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Waiting for Approval">Waiting for Approval</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="Canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="my-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Destination</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Purpose</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredBusinessTrips(businessTripRequests).map((trip) => (
                            <tr key={trip.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4 text-blue-900 font-medium">
                                {trip.country} - {trip.city}
                              </td>
                              <td className="p-4 text-blue-700">{trip.purpose}</td>
                              <td className="p-4 text-blue-700">
                                {trip.startDate} - {trip.endDate}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    trip.status === "Approved"
                                      ? "bg-green-500"
                                      : trip.status === "Rejected"
                                        ? "bg-red-500"
                                        : trip.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {trip.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-500 text-blue-500 hover:bg-blue-50 bg-transparent"
                                    onClick={() => handleBusinessTripAction(trip.id, "edit")}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                                    onClick={() => handleBusinessTripAction(trip.id, "cancel")}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleBusinessTripDetails(trip)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sent-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Requester</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Destination</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredBusinessTrips(sentBusinessTripRequests).map((trip) => (
                            <tr key={trip.id} className="border-t border-blue-100 hover:bg-blue-50">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-blue-900">
                                    {trip.requester.name} {trip.requester.surname}
                                  </p>
                                  <p className="text-sm text-blue-600">{trip.requester.position}</p>
                                </div>
                              </td>
                              <td className="p-4 text-blue-900 font-medium">
                                {trip.country} - {trip.city}
                              </td>
                              <td className="p-4 text-blue-700">
                                {trip.startDate} - {trip.endDate}
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    trip.status === "Approved"
                                      ? "bg-green-500"
                                      : trip.status === "Rejected"
                                        ? "bg-red-500"
                                        : trip.status === "Canceled"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }
                                >
                                  {trip.status}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  {trip.status === "Waiting for Approval" && (
                                    <>
                                      <Button
                                        size="sm"
                                        className="bg-green-500 hover:bg-green-600"
                                        onClick={() => handleBusinessTripAction(trip.id, "approve")}
                                      >
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-500 text-red-500 hover:bg-red-50 bg-transparent"
                                        onClick={() => handleBusinessTripAction(trip.id, "reject")}
                                      >
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleBusinessTripDetails(trip)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all-requests">
                <Card className="bg-white border-blue-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-blue-50">
                          <tr>
                            <th className="text-left p-4 text-blue-900 font-semibold">Requester</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Destination</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Date Range</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Status</th>
                            <th className="text-left p-4 text-blue-900 font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredBusinessTrips([...businessTripRequests, ...sentBusinessTripRequests]).map(
                            (trip) => (
                              <tr key={trip.id} className="border-t border-blue-100 hover:bg-blue-50">
                                <td className="p-4">
                                  <div>
                                    <p className="font-medium text-blue-900">
                                      {trip.requester.name} {trip.requester.surname}
                                    </p>
                                    <p className="text-sm text-blue-600">{trip.requester.position}</p>
                                  </div>
                                </td>
                                <td className="p-4 text-blue-900 font-medium">
                                  {trip.country} - {trip.city}
                                </td>
                                <td className="p-4 text-blue-700">
                                  {trip.startDate} - {trip.endDate}
                                </td>
                                <td className="p-4">
                                  <Badge
                                    className={
                                      trip.status === "Approved"
                                        ? "bg-green-500"
                                        : trip.status === "Rejected"
                                          ? "bg-red-500"
                                          : trip.status === "Canceled"
                                            ? "bg-gray-500"
                                            : "bg-yellow-500"
                                    }
                                  >
                                    {trip.status}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <Button
                                    size="sm"
                                    className="bg-blue-500 hover:bg-blue-600"
                                    onClick={() => handleBusinessTripDetails(trip)}
                                  >
                                    <Eye className="h-3 w-3 mr-1" />
                                    Details
                                  </Button>
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        <Dialog open={showBusinessTripDetails} onOpenChange={setShowBusinessTripDetails}>
          <DialogContent className="max-w-2xl bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Business Trip Request Details</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowBusinessTripDetails(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {selectedBusinessTrip && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-600">Requester</label>
                    <p className="text-blue-900">
                      {selectedBusinessTrip.requester.name} {selectedBusinessTrip.requester.surname}
                    </p>
                    <p className="text-sm text-blue-600">{selectedBusinessTrip.requester.position}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Destination</label>
                    <p className="text-blue-900">
                      {selectedBusinessTrip.country} - {selectedBusinessTrip.city}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Date Range</label>
                    <p className="text-blue-900">
                      {selectedBusinessTrip.startDate} - {selectedBusinessTrip.endDate}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Time Range</label>
                    <p className="text-blue-900">
                      {selectedBusinessTrip.startTime} - {selectedBusinessTrip.endTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Purpose</label>
                    <p className="text-blue-900">{selectedBusinessTrip.purpose}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Project Name</label>
                    <p className="text-blue-900">{selectedBusinessTrip.projectName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Request Date</label>
                    <p className="text-blue-900">{selectedBusinessTrip.requestDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-600">Status</label>
                    <Badge
                      className={
                        selectedBusinessTrip.status === "Approved"
                          ? "bg-green-500"
                          : selectedBusinessTrip.status === "Rejected"
                            ? "bg-red-500"
                            : selectedBusinessTrip.status === "Canceled"
                              ? "bg-gray-500"
                              : "bg-yellow-500"
                      }
                    >
                      {selectedBusinessTrip.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-blue-600 mb-3 block">Approval Route</label>
                  <div className="space-y-3">
                    {selectedBusinessTrip.approvalRoute.map((step, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-blue-900">{step.approver}</p>
                          <p className="text-sm text-blue-600">{step.role}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              step.status === "approved"
                                ? "bg-green-500"
                                : step.status === "rejected"
                                  ? "bg-red-500"
                                  : step.status === "canceled"
                                    ? "bg-gray-500"
                                    : "bg-yellow-500"
                            }
                          >
                            {step.status}
                          </Badge>
                          {step.date && <p className="text-xs text-blue-500 mt-1">{step.date}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Completing the New Business Trip Request dialog with all form fields */}
        <Dialog open={showNewBusinessTripRequest} onOpenChange={setShowNewBusinessTripRequest}>
          <DialogContent className="max-w-sm bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">New Business Trip Request</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewBusinessTripRequest(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Date Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Date</label>
                  <Input
                    type="date"
                    value={newBusinessTripForm.startDate}
                    onChange={(e) => setNewBusinessTripForm((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Date</label>
                  <Input
                    type="date"
                    value={newBusinessTripForm.endDate}
                    onChange={(e) => setNewBusinessTripForm((prev) => ({ ...prev, endDate: e.target.value }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">Start Time</label>
                  <Input
                    type="time"
                    value={newBusinessTripForm.startTime}
                    onChange={(e) => setNewBusinessTripForm((prev) => ({ ...prev, startTime: e.target.value }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-600 mb-2 block">End Time</label>
                  <Input
                    type="time"
                    value={newBusinessTripForm.endTime}
                    onChange={(e) => setNewBusinessTripForm((prev) => ({ ...prev, endTime: e.target.value }))}
                    className="border-blue-200 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Type Dropdown */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Type</label>
                <Select
                  value={newBusinessTripForm.type}
                  onValueChange={(value) => setNewBusinessTripForm((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select trip type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="domestic">Domestic</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Purpose Text Area */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Purpose</label>
                <textarea
                  className="w-full min-h-[120px] p-3 border border-blue-200 rounded-md focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Enter purpose of business trip"
                  value={newBusinessTripForm.purpose}
                  onChange={(e) => setNewBusinessTripForm((prev) => ({ ...prev, purpose: e.target.value }))}
                />
              </div>

              {/* Project Name Dropdown */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Project Name</label>
                <Select
                  value={newBusinessTripForm.projectName}
                  onValueChange={(value) => setNewBusinessTripForm((prev) => ({ ...prev, projectName: value }))}
                >
                  <SelectTrigger className="border-blue-200 focus:border-blue-500">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-alpha">Project Alpha</SelectItem>
                    <SelectItem value="project-beta">Project Beta</SelectItem>
                    <SelectItem value="project-gamma">Project Gamma</SelectItem>
                    <SelectItem value="client-integration">Client Integration</SelectItem>
                    <SelectItem value="system-upgrade">System Upgrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-sm font-medium text-blue-600 mb-2 block">Upload File</label>
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center hover:border-blue-300 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      setNewBusinessTripForm((prev) => ({ ...prev, uploadedFile: file }))
                    }}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-blue-400" />
                      <span className="text-blue-600">
                        {newBusinessTripForm.uploadedFile
                          ? newBusinessTripForm.uploadedFile.name
                          : "Choose File No file chosen"}
                      </span>
                      <span className="text-sm text-blue-400">Click to upload or drag and drop</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    // Handle form submission here
                    console.log("Business trip request submitted:", newBusinessTripForm)
                    setShowNewBusinessTripRequest(false)
                    // Reset form
                    setNewBusinessTripForm({
                      startDate: "",
                      endDate: "",
                      startTime: "",
                      endTime: "",
                      type: "",
                      purpose: "",
                      projectName: "",
                      uploadedFile: null,
                    })
                  }}
                >
                  Submit Request
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50 bg-transparent"
                  onClick={() => setShowNewBusinessTripRequest(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showApplications} onOpenChange={setShowApplications}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Available Applications</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowApplications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 p-4">
              {applications.map((app) => (
                <Card
                  key={app.name}
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors border-blue-200"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 text-blue-900">{app.name}</h3>
                    <p className="text-sm text-blue-600">{app.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (currentPage === "about-company") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-700 p-2 rounded">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </div>
            <span className="font-semibold">X Group</span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>12:25:35 AM</span>
              <span>Sunday, September 28, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>New York</span>
            </div>
            <div className="flex items-center gap-2">
              <span>72°F</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
              <HeadphonesIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
              <Bell className="h-4 w-4" />
              <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-blue-600"
                onClick={() => setShowProfile(!showProfile)}
              >
                <User className="h-4 w-4" />
              </Button>
              {showProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">John Doe</h3>
                      <p className="text-sm text-blue-600">Senior Developer</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Name:</span>
                      <span className="text-sm text-blue-900">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Surname:</span>
                      <span className="text-sm text-blue-900">Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Patronic name:</span>
                      <span className="text-sm text-blue-900">Michael</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Position:</span>
                      <span className="text-sm text-blue-900">Senior Developer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-600">Status:</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                      setShowProfile(false)
                      setShowProfileDetails(true)
                    }}
                  >
                    View profile
                  </Button>
                </div>
              )}
            </div>
            <span>John Doe</span>
          </div>
        </div>

        <div className="flex">
          <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
              <nav className="space-y-2">
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <Home className="h-4 w-4" />
                  <span>Main page</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("employees")}
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("discounts-benefits")}
                >
                  <Gift className="h-4 w-4" />
                  <span>Discounts and Benefits</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <FileText className="h-4 w-4" />
                  <span>Policies and Procedures</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                  <BookOpen className="h-4 w-4" />
                  <span>Documents</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("leaves")}
                >
                  <Plane className="h-4 w-4" />
                  <span>Leaves</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("overtimes")}
                >
                  <Clock className="h-4 w-4" />
                  <span>Overtimes</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                  onClick={() => setCurrentPage("business-trips")}
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Business Trips</span>
                </div>
                <div
                  className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                  onClick={() => setCurrentPage("about-company")}
                >
                  <Building className="h-4 w-4" />
                  <span>About company</span>
                </div>
              </nav>
            </div>

            <div
              className="bg-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              onClick={() => setShowApplications(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 p-1 rounded">
                    <div className="w-4 h-4 bg-blue-700 rounded"></div>
                  </div>
                  <span className="font-medium text-white">Switch Apps</span>
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <main className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">About X Group</h1>
              <p className="text-blue-600">Learn more about our company, leadership, and achievements</p>
            </div>

            {/* Company Overview */}
            <Card className="bg-white border-blue-200 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Building className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">Company Overview</h2>
                </div>
                <div className="prose max-w-none text-blue-700">
                  <p className="mb-4">
                    X Group is a leading technology company founded in 2010, dedicated to delivering innovative
                    solutions that transform businesses and improve lives. With over a decade of experience, we have
                    grown from a small startup to a global enterprise serving clients across multiple industries.
                  </p>
                  <p className="mb-4">
                    Our mission is to harness the power of technology to create meaningful impact for our clients,
                    employees, and communities. We specialize in software development, digital transformation, and
                    cutting-edge technology solutions.
                  </p>
                  <p>
                    Today, X Group employs over 500 talented professionals across 15 offices worldwide, maintaining our
                    commitment to excellence, innovation, and sustainable growth.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Company History */}
            <Card className="bg-white border-blue-200 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">Company History</h2>
                </div>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">2010 - Foundation</h3>
                    <p className="text-blue-700">
                      X Group was founded by three visionary entrepreneurs with a shared passion for technology and
                      innovation. Started in a small garage with just 5 employees.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">2015 - First Major Expansion</h3>
                    <p className="text-blue-700">
                      Opened our first international office in London and reached 50 employees. Launched our flagship
                      product that revolutionized the industry.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">2020 - Digital Transformation</h3>
                    <p className="text-blue-700">
                      Successfully pivoted to remote-first operations during the pandemic. Expanded our digital services
                      portfolio and doubled our client base.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">2024 - Global Leadership</h3>
                    <p className="text-blue-700">
                      Achieved industry leadership position with 500+ employees across 15 countries. Recognized as one
                      of the top technology companies globally.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Management Team */}
            <Card className="bg-white border-blue-200 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">Management Team</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Robert Johnson</h3>
                    <p className="text-blue-600 font-medium mb-2">Chief Executive Officer</p>
                    <p className="text-blue-700 text-sm">
                      Visionary leader with 20+ years of experience in technology and business strategy.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Sarah Williams</h3>
                    <p className="text-blue-600 font-medium mb-2">Chief Technology Officer</p>
                    <p className="text-blue-700 text-sm">
                      Technology expert leading our innovation initiatives and product development.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Michael Davis</h3>
                    <p className="text-blue-600 font-medium mb-2">Chief Financial Officer</p>
                    <p className="text-blue-700 text-sm">
                      Financial strategist ensuring sustainable growth and operational excellence.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Emily Chen</h3>
                    <p className="text-blue-600 font-medium mb-2">Chief Operating Officer</p>
                    <p className="text-blue-700 text-sm">
                      Operations leader optimizing processes and driving organizational efficiency.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">David Martinez</h3>
                    <p className="text-blue-600 font-medium mb-2">Chief Marketing Officer</p>
                    <p className="text-blue-700 text-sm">
                      Marketing visionary building our brand and expanding global market presence.
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Lisa Thompson</h3>
                    <p className="text-blue-600 font-medium mb-2">Chief Human Resources Officer</p>
                    <p className="text-blue-700 text-sm">
                      People-focused leader fostering talent development and company culture.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Awards and Certifications */}
            <Card className="bg-white border-blue-200 mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Award className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-blue-900">Awards & Certifications</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Awards & Recognition</h3>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <h4 className="font-semibold text-yellow-900">Tech Innovation Award 2024</h4>
                      </div>
                      <p className="text-yellow-700 text-sm">Recognized for breakthrough AI solutions</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-green-900">Best Workplace 2023</h4>
                      </div>
                      <p className="text-green-700 text-sm">Top employer for employee satisfaction</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-5 w-5 text-purple-600" />
                        <h4 className="font-semibold text-purple-900">Global Excellence Award 2022</h4>
                      </div>
                      <p className="text-purple-700 text-sm">Outstanding international business growth</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">ISO Certifications</h3>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-900">ISO 9001:2015</h4>
                      </div>
                      <p className="text-blue-700 text-sm">Quality Management Systems</p>
                      <p className="text-blue-500 text-xs mt-1">Valid until: December 2025</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-900">ISO 27001:2013</h4>
                      </div>
                      <p className="text-blue-700 text-sm">Information Security Management</p>
                      <p className="text-blue-500 text-xs mt-1">Valid until: March 2026</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-900">ISO 14001:2015</h4>
                      </div>
                      <p className="text-blue-700 text-sm">Environmental Management Systems</p>
                      <p className="text-blue-500 text-xs mt-1">Valid until: June 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partners */}
            <Card className="bg-white border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Users className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-semibold text-blue-900">Our Partners</h2>
                  </div>
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-blue-500" />
                      <Input
                        placeholder="Search partners..."
                        className="pl-10"
                        value={partnerSearch}
                        onChange={(e) => setPartnerSearch(e.target.value)}
                      />
                    </div>
                    <Select value={partnerFilter} onValueChange={setPartnerFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Degrees</SelectItem>
                        <SelectItem value="platinum">Platinum</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="bronze">Bronze</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPartners.map((partner, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-blue-900">{partner.name}</h3>
                        <Badge
                          className={
                            partner.degree === "platinum"
                              ? "bg-gray-400 text-white"
                              : partner.degree === "gold"
                                ? "bg-yellow-500 text-white"
                                : partner.degree === "silver"
                                  ? "bg-gray-500 text-white"
                                  : "bg-orange-500 text-white"
                          }
                        >
                          {partner.degree}
                        </Badge>
                      </div>
                      <p className="text-blue-700 text-sm mb-3">{partner.description}</p>
                      <p className="text-blue-500 text-xs">Partnership since: 2018</p>
                    </div>
                  ))}
                </div>

                {filteredPartners.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-blue-600">No partners found matching your search criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>

        <Dialog open={showApplications} onOpenChange={setShowApplications}>
          <DialogContent className="max-w-md bg-white border-blue-200">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-blue-900">Available Applications</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowApplications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 p-4">
              {applications.map((app) => (
                <Card
                  key={app.name}
                  className="bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors border-blue-200"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 text-blue-900">{app.name}</h3>
                    <p className="text-sm text-blue-600">{app.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // Default to dashboard if no other page is selected
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-blue-700 p-2 rounded">
            <ArrowRight className="h-4 w-4 rotate-180" />
          </div>
          <span className="font-semibold">X Group</span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>12:25:35 AM</span>
            <span>Sunday, September 28, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>New York</span>
          </div>
          <div className="flex items-center gap-2">
            <span>72°F</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600">
            <HeadphonesIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-blue-600 relative">
            <Bell className="h-4 w-4" />
            <span className="bg-red-500 text-xs rounded-full px-1.5 py-0.5 absolute -top-2 -right-2">3</span>
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-blue-600"
              onClick={() => setShowProfile(!showProfile)}
            >
              <User className="h-4 w-4" />
            </Button>
            {showProfile && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-blue-200 rounded-lg shadow-lg p-4 w-80 z-50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">John Doe</h3>
                    <p className="text-sm text-blue-600">Senior Developer</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Name:</span>
                    <span className="text-sm text-blue-900">John</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Surname:</span>
                    <span className="text-sm text-blue-900">Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Patronic name:</span>
                    <span className="text-sm text-blue-900">Michael</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Position:</span>
                    <span className="text-sm text-blue-900">Senior Developer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-600">Status:</span>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    setShowProfile(false)
                    setShowProfileDetails(true)
                  }}
                >
                  View profile
                </Button>
              </div>
            )}
          </div>
          <span>John Doe</span>
        </div>
      </div>

      <div className="flex">
        <div className="w-64 bg-blue-50 p-6 h-screen sticky top-0 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-blue-600 font-medium mb-4">Navigation</h2>
            <nav className="space-y-2">
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer bg-blue-100"
                onClick={() => setCurrentPage("dashboard")}
              >
                <Home className="h-4 w-4" />
                <span>Main page</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("employees")}
              >
                <Users className="h-4 w-4" />
                <span>Employees</span>
              </div>
              {/* Added calendar page state and meeting management */}
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("calendar")}
              >
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("discounts-benefits")}
              >
                <Gift className="h-4 w-4" />
                <span>Discounts and Benefits</span>
              </div>
              <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                <FileText className="h-4 w-4" />
                <span>Policies and Procedures</span>
              </div>
              <div className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer">
                <BookOpen className="h-4 w-4" />
                <span>Documents</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("leaves")}
              >
                <Plane className="h-4 w-4" />
                <span>Leaves</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("overtimes")}
              >
                <Clock className="h-4 w-4" />
                <span>Overtimes</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("business-trips")}
              >
                <Briefcase className="h-4 w-4" />
                <span>Business Trips</span>
              </div>
              <div
                className="flex items-center gap-3 p-2 text-blue-700 hover:bg-blue-100 rounded-lg cursor-pointer"
                onClick={() => setCurrentPage("about-company")}
              >
                <Building className="h-4 w-4" />
                <span>About company</span>
              </div>
            </nav>
          </div>

          <div
            className="bg-blue-500 p-4 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={() => setShowApplications(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1 rounded">
                  <div className="w-4 h-4 bg-blue-700 rounded"></div>
                </div>
                <span className="font-medium text-white">Switch Apps</span>
              </div>
              <ChevronDown className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Welcome back, John! 👋</h1>
              <p className="text-blue-600">Here's what's happening at X Group today</p>
            </div>
            <Button
              onClick={() => setShowNewItemModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Item</span>
            </Button>
          </div>

          {/* Task Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card
              className="bg-white border-blue-200 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentPage("task-list")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Assigned Tasks</p>
                    <p className="text-3xl font-bold text-blue-900">12</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Assigned Tickets</p>
                    <p className="text-3xl font-bold text-blue-900">8</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Ticket className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Shared Documents</p>
                    <p className="text-3xl font-bold text-blue-900">24</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent News */}
            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-900">Recent News</h2>
                  </div>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    See All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-blue-100 pb-4">
                    <h3 className="font-semibold text-blue-900 mb-1">Q4 Company Results Released</h3>
                    <p className="text-blue-600 text-sm mb-2">Quarterly performance shows 15% growth...</p>
                    <p className="text-blue-500 text-xs">2 hours ago</p>
                  </div>
                  <div className="border-b border-blue-100 pb-4">
                    <h3 className="font-semibold text-blue-900 mb-1">New Employee Benefits Program</h3>
                    <p className="text-blue-600 text-sm mb-2">Enhanced healthcare and wellness options...</p>
                    <p className="text-blue-500 text-xs">1 day ago</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Office Renovation Update</h3>
                    <p className="text-blue-600 text-sm mb-2">Phase 2 of the renovation will begin...</p>
                    <p className="text-blue-500 text-xs">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Bell className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-900">Announcements</h2>
                  </div>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    See All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-blue-100 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-900">Holiday Schedule Update</h3>
                      <Badge className="bg-red-500 text-white">high</Badge>
                    </div>
                    <p className="text-blue-600 text-sm mb-2">Please note the updated holiday schedule for December</p>
                    <p className="text-blue-500 text-xs">3 hours ago</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-900">Security Training Mandatory</h3>
                      <Badge className="bg-blue-500 text-white">medium</Badge>
                    </div>
                    <p className="text-blue-600 text-sm mb-2">
                      All employees must complete security training by month end
                    </p>
                    <p className="text-blue-500 text-xs">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Upcoming Events */}
            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-900">Upcoming Events</h2>
                  </div>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    See All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-blue-100 pb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Team Building Event</h3>
                    <div className="flex items-center gap-2 text-blue-600 text-sm mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Dec 15, 2024 at 2:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Conference Room A</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Annual Company Party</h3>
                    <div className="flex items-center gap-2 text-blue-600 text-sm mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Dec 20, 2024 at 6:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>Main Hall</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hot Vacancies */}
            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-900">Hot Vacancies</h2>
                  </div>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                    See All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-blue-100 pb-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Senior Frontend Developer</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-700">Engineering</Badge>
                      <Badge className="bg-green-100 text-green-700">Full-time</Badge>
                    </div>
                    <p className="text-blue-500 text-xs">2 days ago</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">Marketing Manager</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-purple-100 text-purple-700">Marketing</Badge>
                      <Badge className="bg-green-100 text-green-700">Full-time</Badge>
                    </div>
                    <p className="text-blue-500 text-xs">1 week ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My To-Do List */}
            <Card className="bg-white border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-blue-900">My To-Do List</h2>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
                <p className="text-blue-600 text-sm mb-4">2 of 5 tasks completed</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Checkbox id="task1" />
                    <label htmlFor="task1" className="text-blue-900">
                      Complete quarterly performance review
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="task2" checked />
                    <label htmlFor="task2" className="text-blue-900 line-through">
                      Submit expense reports
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox id="task3" checked />
                    <label htmlFor="task3" className="text-blue-900 line-through">
                      Update project documentation
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trainings and HR Surveys */}
            <div className="space-y-6">
              {/* Trainings */}
              <Card className="bg-white border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                      <h2 className="text-xl font-semibold text-blue-900">Trainings</h2>
                    </div>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                      See All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-blue-900">Cybersecurity Awareness Training</h3>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Participate</Button>
                      </div>
                      <p className="text-blue-600 text-sm mb-2">
                        Learn about latest security threats and best practices
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-100 text-orange-700">Not Started</Badge>
                        <span className="text-blue-500 text-xs">Deadline: Dec 31, 2024</span>
                      </div>
                    </div>
                    <div className="border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-blue-900">Project Management Fundamentals</h3>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Continue</Button>
                      </div>
                      <p className="text-blue-600 text-sm mb-2">Master the basics of effective project management</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
                        <span className="text-blue-500 text-xs">Progress: 60% | Deadline: Jan 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* HR Surveys */}
              <Card className="bg-white border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-6 w-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-900">HR Surveys</h2>
                  </div>
                  <div className="border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Employee Satisfaction Survey 2024</h3>
                    <p className="text-blue-600 text-sm mb-4">Help us improve your work experience</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-500 text-sm">5 min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        <span className="text-red-500 text-sm">Due: Dec 31, 2024</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">Take Survey</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {showNewItemModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create New Item</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowNewItemModal(false)
                  setNewItemForm({
                    subject: "",
                    body: "",
                    assignedUser: "",
                    project: "",
                    type: "task",
                    relatedNumber: "",
                    tag: "",
                    priority: "medium",
                    group: "",
                    attachment: null,
                    site: "google",
                    name: "",
                    sharedPersons: "",
                    notes: "",
                  })
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Item Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">What would you like to create?</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="task"
                    name="itemType"
                    value="task"
                    checked={newItemType === "task"}
                    onChange={(e) => setNewItemType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="task" className="ml-2 text-sm text-gray-700">
                    Create a Task
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ticket"
                    name="itemType"
                    value="ticket"
                    checked={newItemType === "ticket"}
                    onChange={(e) => setNewItemType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="ticket" className="ml-2 text-sm text-gray-700">
                    Create a Ticket
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="file"
                    name="itemType"
                    value="file"
                    checked={newItemType === "file"}
                    onChange={(e) => setNewItemType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="file" className="ml-2 text-sm text-gray-700">
                    Share a File
                  </label>
                </div>
              </div>
            </div>

            {/* Task Creation Form */}
            {newItemType === "task" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      value={newItemForm.subject}
                      onChange={(e) => setNewItemForm({ ...newItemForm, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter task subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      value={newItemForm.type}
                      onChange={(e) => setNewItemForm({ ...newItemForm, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="task">Task</option>
                      <option value="user story">User Story</option>
                      <option value="bug">Bug</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body *</label>
                  <textarea
                    value={newItemForm.body}
                    onChange={(e) => setNewItemForm({ ...newItemForm, body: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the task in detail"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned User *</label>
                    <select
                      value={newItemForm.assignedUser}
                      onChange={(e) => setNewItemForm({ ...newItemForm, assignedUser: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select user</option>
                      <option value="john.doe">John Doe</option>
                      <option value="jane.smith">Jane Smith</option>
                      <option value="mike.johnson">Mike Johnson</option>
                      <option value="sarah.wilson">Sarah Wilson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project *</label>
                    <select
                      value={newItemForm.project}
                      onChange={(e) => setNewItemForm({ ...newItemForm, project: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select project</option>
                      <option value="web-app">Web Application</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="api-service">API Service</option>
                      <option value="dashboard">Dashboard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related Ticket/Task #</label>
                    <input
                      type="text"
                      value={newItemForm.relatedNumber}
                      onChange={(e) => setNewItemForm({ ...newItemForm, relatedNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., #1234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                    <input
                      type="text"
                      value={newItemForm.tag}
                      onChange={(e) => setNewItemForm({ ...newItemForm, tag: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., frontend, backend"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                    <select
                      value={newItemForm.priority}
                      onChange={(e) => setNewItemForm({ ...newItemForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Ticket Creation Form */}
            {newItemType === "ticket" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Group *</label>
                    <select
                      value={newItemForm.group}
                      onChange={(e) => setNewItemForm({ ...newItemForm, group: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select group</option>
                      <option value="it-support">IT Support</option>
                      <option value="development">Development</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site *</label>
                    <select
                      value={newItemForm.site}
                      onChange={(e) => setNewItemForm({ ...newItemForm, site: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="google">Google</option>
                      <option value="microsoft">Microsoft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    value={newItemForm.subject}
                    onChange={(e) => setNewItemForm({ ...newItemForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter ticket subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body *</label>
                  <textarea
                    value={newItemForm.body}
                    onChange={(e) => setNewItemForm({ ...newItemForm, body: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the issue in detail"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned User *</label>
                    <select
                      value={newItemForm.assignedUser}
                      onChange={(e) => setNewItemForm({ ...newItemForm, assignedUser: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select user</option>
                      <option value="john.doe">John Doe</option>
                      <option value="jane.smith">Jane Smith</option>
                      <option value="mike.johnson">Mike Johnson</option>
                      <option value="sarah.wilson">Sarah Wilson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                    <select
                      value={newItemForm.priority}
                      onChange={(e) => setNewItemForm({ ...newItemForm, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                  <input
                    type="file"
                    onChange={(e) => setNewItemForm({ ...newItemForm, attachment: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* File Sharing Form */}
            {newItemType === "file" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newItemForm.name}
                    onChange={(e) => setNewItemForm({ ...newItemForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter file name or title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachment *</label>
                  <input
                    type="file"
                    onChange={(e) => setNewItemForm({ ...newItemForm, attachment: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shared Persons *</label>
                  <input
                    type="text"
                    value={newItemForm.sharedPersons}
                    onChange={(e) => setNewItemForm({ ...newItemForm, sharedPersons: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email addresses separated by commas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newItemForm.notes}
                    onChange={(e) => setNewItemForm({ ...newItemForm, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any additional notes or instructions"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewItemModal(false)
                  setNewItemForm({
                    subject: "",
                    body: "",
                    assignedUser: "",
                    project: "",
                    type: "task",
                    relatedNumber: "",
                    tag: "",
                    priority: "medium",
                    group: "",
                    attachment: null,
                    site: "google",
                    name: "",
                    sharedPersons: "",
                    notes: "",
                  })
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  // Here you would handle the form submission
                  console.log("Creating new item:", newItemType, newItemForm)
                  setShowNewItemModal(false)
                  setNewItemForm({
                    subject: "",
                    body: "",
                    assignedUser: "",
                    project: "",
                    type: "task",
                    relatedNumber: "",
                    tag: "",
                    priority: "medium",
                    group: "",
                    attachment: null,
                    site: "google",
                    name: "",
                    sharedPersons: "",
                    notes: "",
                  })
                }}
              >
                Create {newItemType === "task" ? "Task" : newItemType === "ticket" ? "Ticket" : "File Share"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile dropdown and other dialogs remain the same */}
      <Dialog open={showProfile && !showProfileDetails} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-80 bg-white border-blue-200">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-blue-900">User Profile</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">John Doe</h3>
              <p className="text-sm text-blue-600">Senior Developer</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Name:</span>
              <span className="text-sm text-blue-900">John</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Surname:</span>
              <span className="text-sm text-blue-900">Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Patronic name:</span>
              <span className="text-sm text-blue-900">Michael</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Position:</span>
              <span className="text-sm text-blue-900">Senior Developer</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-600">Status:</span>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </div>
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setShowProfile(false)
              setShowProfileDetails(true)
            }}
          >
            View profile
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
