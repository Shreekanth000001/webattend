import React from 'react';

// --- TYPE DEFINITIONS ---
type AttendanceStatus = 'present' | 'absent' | 'leave';

// Matches the backend structure from Supabase
interface AttendanceRecord {
    id: number;
    student_id: number; // Matches 'student_id' column in the database
    date: string; // YYYY-MM-DD
    status: AttendanceStatus;
}

// Matches the backend structure from Supabase
interface Student {
    id: number;
    name: string;
    // Note: avatar and class are not in the current DB schema.
    // They are added here for the UI and will use placeholder data.
    avatar?: string;
    class?: string;
    uid?: string;
}


const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

const ReportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

// --- HELPER FUNCTIONS ---
const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// --- SUB-COMPONENTS ---

const Sidebar: React.FC<{
    currentView: string;
    setView: (view: 'dashboard' | 'students' | 'reports') => void;
}> = ({ currentView, setView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
        { id: 'students', label: 'Students', icon: <UserIcon /> },
        { id: 'reports', label: 'Reports', icon: <ReportIcon /> },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
            <div className="text-2xl font-bold text-indigo-600 mb-10">MATS Attend</div>
            <nav className="flex flex-col space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as 'dashboard' | 'students' | 'reports')}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentView === item.id
                            ? 'bg-indigo-500 text-white shadow-lg'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="mt-auto p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">Web Attendance System</p>
                <p className="text-xs text-gray-400 mt-1">&copy; 2025 Critic Coder</p>
            </div>
        </aside>
    );
};

const Header: React.FC<{ title: string }> = ({ title }) => (
    <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center space-x-4">
            <div className="relative w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                </span>
                <input
                    type="text"
                    placeholder="Search student..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <img
                src="https://i.pravatar.cc/150?u=admin"
                alt="Admin"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
            />
        </div>
    </header>
);

const StatCard: React.FC<{ title: string; value: string | number; color: string }> = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex-1">
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
);

const AttendanceChart: React.FC = () => {
    // This chart is still using static data. It would need to be updated to process the fetched attendance records.
    const chartData = [
        { day: 'Mon', present: 6, absent: 1 },
        { day: 'Tue', present: 5, absent: 2 },
        { day: 'Wed', present: 7, absent: 0 },
        { day: 'Thu', present: 4, absent: 3 },
        { day: 'Fri', present: 5, absent: 2 },
    ];
    const maxAttendance = 8;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Weekly Attendance</h3>
            <div className="flex justify-between items-end h-48 space-x-4">
                {chartData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex items-end h-full">
                            <div
                                className="w-1/2 bg-green-400 rounded-t-lg"
                                style={{ height: `${(data.present / maxAttendance) * 100}%` }}
                                title={`Present: ${data.present}`}
                            ></div>
                            <div
                                className="w-1/2 bg-red-400 rounded-t-lg"
                                style={{ height: `${(data.absent / maxAttendance) * 100}%` }}
                                title={`Absent: ${data.absent}`}
                            ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{data.day}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Dashboard: React.FC<{
    students: Student[];
    attendance: AttendanceRecord[];
    setView: (view: 'students' | 'dashboard' | 'reports') => void;
    setSelectedStudent: (student: Student | null) => void;
}> = ({ students, attendance, setView, setSelectedStudent }) => {
    const today = getTodayDateString();
    const presentToday = attendance.filter(a => a.date === today && a.status === 'present').length;
    const absentToday = attendance.filter(a => a.date === today && a.status === 'absent').length;
    const totalStudents = students.length;

    const recentRecords = attendance.filter(a => a.date === today).slice(0, 5);

    const handleStudentClick = (studentId: number) => {
        const student = students.find(s => s.id === studentId);
        if (student) {
            setSelectedStudent(student);
            setView('students');
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Students" value={totalStudents} color="text-indigo-500" />
                <StatCard title="Present Today" value={presentToday} color="text-green-500" />
                <StatCard title="Absent Today" value={absentToday} color="text-red-500" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AttendanceChart />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Activity</h3>
                    <ul className="space-y-4">
                        {recentRecords.map(record => {
                            const student = students.find(s => s.id === record.student_id);
                            const statusColor = record.status === 'present' ? 'bg-green-100 text-green-700' :
                                record.status === 'absent' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700';
                            return (
                                <li key={record.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handleStudentClick(record.student_id)}>
                                    <img src={student?.avatar || `https://i.pravatar.cc/150?u=${student?.id}`} alt={student?.name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <p className="font-semibold text-gray-700">{student?.name}</p>
                                        <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${statusColor}`}>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const StudentList: React.FC<{
    students: Student[];
    attendance: AttendanceRecord[];
    setSelectedStudent: (student: Student | null) => void;
}> = ({ students, attendance, setSelectedStudent }) => {

    const calculateAttendancePercentage = (studentId: number) => {
        const studentRecords = attendance.filter(a => a.student_id === studentId);
        if (studentRecords.length === 0) return 0;
        const presentCount = studentRecords.filter(a => a.status === 'present').length;
        return ((presentCount / studentRecords.length) * 100).toFixed(0);
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Student Name</th>
                            <th className="p-4 font-semibold text-gray-600">Class</th>
                            <th className="p-4 font-semibold text-gray-600">Attendance %</th>
                            <th className="p-4 font-semibold text-gray-600">Status Today</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => {
                            const todayStatus = attendance.find(
  a => a.student_id === student.id && a.date === getTodayDateString()
)?.status || 'N/A';

const statusColor =
  todayStatus === 'present'
    ? 'bg-green-100 text-green-700'
    : todayStatus === 'absent'
    ? 'bg-red-100 text-red-700'
    : todayStatus === 'leave'
    ? 'bg-yellow-100 text-yellow-700'
    : 'bg-gray-100 text-gray-700';


                            return (
                                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedStudent(student)}>
                                    <td className="p-4 flex items-center space-x-3">
                                        <img src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} className="w-10 h-10 rounded-full" />
                                        <span className="font-medium text-gray-800">{student.name}</span>
                                    </td>
                                    <td className="p-4 text-gray-600">{student.class || 'II-BCA'}</td>
                                    <td className="p-4 text-gray-800 font-semibold">{calculateAttendancePercentage(student.id)}%</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColor}`}>
                                            {todayStatus.charAt(0).toUpperCase() + todayStatus.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StudentDetail: React.FC<{
    student: Student;
    attendance: AttendanceRecord[];
    onBack: () => void;
}> = ({ student, attendance, onBack }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const studentRecords = attendance.filter(a => a.student_id === student.id);

    const getStatusForDay = (day: number) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return studentRecords.find(r => r.date === dateStr)?.status;
    };

    const totalClasses = studentRecords.length;
    const presentClasses = studentRecords.filter(r => r.status === 'present').length;
    const attendancePercentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(0) : 'N/A';

    return (
        <div className="p-6">
            <button onClick={onBack} className="mb-4 text-indigo-600 hover:underline">
                &larr; Back to Student List
            </button>
            <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center space-x-6 mb-6">
                    <img src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`} alt={student.name} className="w-24 h-24 rounded-full border-4 border-indigo-200" />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
                        <p className="text-gray-500">Student ID: {student.id} | Class: {student.class || 'BCA-II'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center"><p className="text-sm text-blue-600 font-semibold">Total Classes</p><p className="text-2xl font-bold text-blue-800">{totalClasses}</p></div>
                    <div className="bg-green-50 p-4 rounded-lg text-center"><p className="text-sm text-green-600 font-semibold">Classes Attended</p><p className="text-2xl font-bold text-green-800">{presentClasses}</p></div>
                    <div className="bg-indigo-50 p-4 rounded-lg text-center"><p className="text-sm text-indigo-600 font-semibold">Attendance %</p><p className="text-2xl font-bold text-indigo-800">{attendancePercentage}%</p></div>
                </div>

                <h3 className="text-xl font-bold text-gray-700 mb-4">Current Month Attendance</h3>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-semibold text-gray-500 p-2">{day}</div>)}
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
                    {monthDays.map(day => {
                        const status = getStatusForDay(day);
                        let dayClass = 'p-2 rounded-full w-10 h-10 flex items-center justify-center m-auto';
                        if (status === 'present') dayClass += ' bg-green-200 text-green-800 font-bold';
                        else if (status === 'absent') dayClass += ' bg-red-200 text-red-800 font-bold';
                        else if (status === 'leave') dayClass += ' bg-yellow-200 text-yellow-800 font-bold';
                        else dayClass += ' text-gray-700';

                        return <div key={day} className={dayClass}>{day}</div>
                    })}
                </div>
            </div>
        </div>
    );
};

const Reports: React.FC = () => {
    return (<div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" id="start-date" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" id="end-date" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
            </div>
            <div className="flex space-x-4">
                <button className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">Generate Report</button>
                <button className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">Export as CSV</button>
            </div></div>
        <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-4">Report Preview</h3>
            <p className="text-gray-500">Generated report data will be displayed here.</p>
        </div></div>);
};


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
    const [view, setView] = React.useState<'dashboard' | 'students' | 'reports'>('dashboard');
    const [students, setStudents] = React.useState<Student[]>([]);
    const [attendance, setAttendance] = React.useState<AttendanceRecord[]>([]);
    const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    // Effect to fetch initial data from the backend
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch students and attendance data in parallel
                const [studentsRes, attendanceRes] = await Promise.all([
                    fetch('https://webattendbackend.onrender.com/api/students'),
                    fetch('https://webattendbackend.onrender.com/api/attendance'),
                ]);

                if (!studentsRes.ok || !attendanceRes.ok) {
                    throw new Error('Failed to fetch data from the server.');
                }

                const studentsData = await studentsRes.json();
                const attendanceData = await attendanceRes.json();

                setStudents(studentsData);
                setAttendance(attendanceData);
                console.log(studentsData);
                console.log(attendanceData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Runs only once on component mount

    const renderView = () => {
        if (loading) {
            return <div className="p-6 text-center text-gray-500">Loading student data...</div>;
        }
        if (error) {
            return <div className="p-6 text-center text-red-500">Error: {error}</div>;
        }

        if (selectedStudent) {
            return <StudentDetail student={selectedStudent} attendance={attendance} onBack={() => setSelectedStudent(null)} />;
        }

        switch (view) {
            case 'dashboard':
                return <Dashboard students={students} attendance={attendance} setView={setView} setSelectedStudent={setSelectedStudent} />;
            case 'students':
                return <StudentList students={students} attendance={attendance} setSelectedStudent={setSelectedStudent} />;
            case 'reports':
                return <Reports />;
            default:
                return <Dashboard students={students} attendance={attendance} setView={setView} setSelectedStudent={setSelectedStudent} />;
        }
    };

    const getHeaderTitle = () => {
        if (selectedStudent) return "Student Details";
        switch (view) {
            case 'dashboard': return 'Dashboard';
            case 'students': return 'Student Management';
            case 'reports': return 'Attendance Reports';
            default: return 'Dashboard';
        }
    }

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar currentView={selectedStudent ? 'students' : view} setView={(v) => { setSelectedStudent(null); setView(v); }} />
            <main className="flex-1 flex flex-col overflow-y-auto">
                <Header title={getHeaderTitle()} />
                {renderView()}
            </main>
        </div>
    );
};

export default App;
