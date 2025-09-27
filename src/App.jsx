import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Video, Users, LogOut, Settings, Share2, Trash2, Download, CheckCircle, Clock, Link as LinkIcon, Zap, FileText, Target, User as UserIcon, Bell, CreditCard, Shield } from 'lucide-react';

// Main App Component - Simulates routing and state management
export default function App() {
  const [page, setPage] = useState('login'); // 'login', 'signup', 'dashboard', 'meeting', 'settings'
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false); // Toggle for demo purposes

  // Mock user data
  const [user, setUser] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    avatarUrl: '[https://i.pravatar.cc/150?u=alexrivera](https://i.pravatar.cc/150?u=alexrivera)',
  });

  // Mock meeting data
  const meetings = [
    {
      id: 1,
      title: 'Q3 Project Phoenix Strategy Sync',
      platform: 'Zoom',
      date: '2025-09-26T10:00:00Z',
      duration: '45 min',
      attendees: 5,
      summary: 'Aligned on the final feature set for the Q3 launch. Key decisions made on budget allocation and marketing push. Action items assigned to team leads.',
      actionItems: [
        { id: 1, text: 'Finalize budget report for Phoenix.', owner: 'Sarah', completed: true },
        { id: 2, text: 'Draft initial marketing copy.', owner: 'Alex', completed: false },
        { id: 3, text: 'Update the project timeline in Jira.', owner: 'Mike', completed: false },
      ],
      transcript: [
        { speaker: 'Sarah', time: '00:02:15', text: 'Okay team, let\'s kick things off. The main agenda today is to finalize the budget for Project Phoenix.' },
        { speaker: 'Alex', time: '00:03:01', text: 'Thanks, Sarah. I\'ve reviewed the preliminary numbers. I think we need to allocate more to the digital marketing campaign.' },
        { speaker: 'Mike', time: '00:05:20', text: 'I agree with Alex. The initial allocation seems a bit low given our target demographic. What are your thoughts, Sarah?' },
        { speaker: 'Sarah', time: '00:06:45', text: 'That\'s a fair point. Let\'s increase it by 15%. I\'ll take the action item to finalize the budget report with the new figures.' },
         { speaker: 'Alex', time: '00:08:10', text: 'Great. I will draft the initial marketing copy based on that. Mike, can you handle the timeline update?' },
         { speaker: 'Mike', time: '00:08:35', text: 'Yep, consider it done. I\'ll update the Jira board this afternoon.' },
      ],
      keyTopics: ['Budget Allocation', 'Project Phoenix', 'Marketing Campaign', 'Timeline', 'Jira Update', 'Q3 Launch'],
    },
    {
      id: 2,
      title: 'Weekly Standup - Engineering Team',
      platform: 'Google Meet',
      date: '2025-09-25T09:00:00Z',
      duration: '25 min',
      attendees: 8,
      summary: 'Quick updates on current sprints. No major blockers identified. Discussed the upcoming server migration and assigned preliminary research tasks.',
      actionItems: [{ id: 1, text: 'Research new server migration tools.', owner: 'Dev Team', completed: false }],
      transcript: [{ speaker: 'Lead', time: '00:01:00', text: 'Alright, quick updates everyone...' }],
      keyTopics: ['Sprint Update', 'Server Migration', 'Blockers', 'Performance Metrics'],
    },
     {
      id: 3,
      title: 'Client Onboarding Call - Acme Corp',
      platform: 'Zoom',
      date: '2025-09-24T14:00:00Z',
      duration: '1 hr 15 min',
      attendees: 3,
      summary: 'Successful onboarding for Acme Corp. Walked through the platform\'s main features and answered their initial questions. Follow-up meeting scheduled.',
      actionItems: [{ id: 1, text: 'Send follow-up email with resources to Acme.', owner: 'Alex', completed: true }],
      transcript: [{ speaker: 'Alex', time: '00:02:30', text: 'Welcome to the platform, we\'re excited to have you onboard...' }],
      keyTopics: ['Onboarding', 'Acme Corp', 'Platform Demo', 'User Questions', 'Follow-up'],
    }
  ];

  const handleSelectMeeting = (meeting) => {
    setLoading(true);
    setSelectedMeeting(meeting);
    setTimeout(() => {
      setPage('meeting');
      setLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setPage('dashboard');
      setLoading(false);
    }, 1200);
  }

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setPage('dashboard');
      setLoading(false);
    }, 1200);
  }

  // A simple router
  const renderPage = () => {
    if (loading && (page.includes('dashboard') || page.includes('meeting'))) {
      return <DashboardSkeleton />;
    }
    switch (page) {
      case 'login':
        return <LoginPage onLogin={handleLogin} isLoading={loading} setPage={setPage} />;
      case 'signup':
        return <SignUpPage onSignUp={handleSignUp} isLoading={loading} setPage={setPage} />;
      case 'dashboard':
        return <Dashboard user={user} meetings={showEmptyState ? [] : meetings} onSelectMeeting={handleSelectMeeting} setPage={setPage} />;
      case 'meeting':
        return <MeetingDetails meeting={selectedMeeting} onBack={() => setPage('dashboard')} />;
      case 'settings':
        return <AccountSettingsPage user={user} setUser={setUser} setPage={setPage} />;
      default:
        return <LoginPage onLogin={handleLogin} isLoading={loading} setPage={setPage} />;
    }
  };

  const isAuthPage = page === 'login' || page === 'signup';

  return (
    <div className={`font-sans min-h-screen antialiased selection:bg-indigo-500/30 ${isAuthPage ? 'bg-black text-gray-400' : 'bg-[#0A0A0A] text-gray-300'}`}>
        {!isAuthPage && (
          <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          </div>
        )}
        <div className="relative z-10">
            {page.includes('dashboard') && (
              <div className="fixed bottom-4 right-4 z-50 bg-gray-900 p-2 rounded-md border border-gray-700 text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={showEmptyState} onChange={() => setShowEmptyState(!showEmptyState)} className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"/>
                  <span>Show Empty State</span>
                </label>
              </div>
            )}
            {renderPage()}
        </div>
    </div>
  );
}

// -- PAGES & COMPONENTS -- //

const LoginPage = ({ onLogin, isLoading, setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center items-center mb-4 space-x-2">
            <h1 className="text-3xl font-medium tracking-widest text-gray-300">REC</h1>
            <Mic className="h-6 w-6 text-gray-500" />
            <h1 className="text-3xl font-medium tracking-widest text-gray-300">CORE</h1>
        </div>
        <p className="text-gray-600 text-sm mb-12">The essential AI assistant for your meetings.</p>
        
        <div className="space-y-4 text-left">
            <input 
                id="email" 
                type="email" 
                placeholder="alex@company.com" 
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-800 focus:border-gray-400 outline-none transition-colors duration-300 text-sm"
            />
            <input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-800 focus:border-gray-400 outline-none transition-colors duration-300 text-sm"
            />
        </div>

        <div className="mt-10">
             <button 
                onClick={onLogin} 
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-md text-sm font-semibold text-black bg-gray-200 hover:bg-white focus:outline-none transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
             >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mx-auto"></div>
                ) : (
                    'Sign In'
                )}
            </button>
        </div>
      </div>
       <p className="mt-8 text-center text-sm text-gray-600">Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setPage('signup'); }} className="font-medium text-blue-500 hover:text-blue-400">Sign Up</a></p>
    </div>
  );
};

const SignUpPage = ({ onSignUp, isLoading, setPage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center items-center mb-4 space-x-2">
            <h1 className="text-3xl font-medium tracking-widest text-gray-300">REC</h1>
            <Mic className="h-6 w-6 text-gray-500" />
            <h1 className="text-3xl font-medium tracking-widest text-gray-300">CORE</h1>
        </div>
        <p className="text-gray-600 text-sm mb-12">Create your account to get started.</p>
        
        <div className="space-y-4 text-left">
            <input 
                id="name" 
                type="text" 
                placeholder="Full Name" 
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-800 focus:border-gray-400 outline-none transition-colors duration-300 text-sm"
            />
            <input 
                id="email-signup" 
                type="email" 
                placeholder="Email Address" 
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-800 focus:border-gray-400 outline-none transition-colors duration-300 text-sm"
            />
            <input 
                id="password-signup" 
                type="password" 
                placeholder="Create Password" 
                className="block w-full px-1 py-3 bg-transparent border-b border-gray-800 focus:border-gray-400 outline-none transition-colors duration-300 text-sm"
            />
        </div>

        <div className="mt-10">
             <button 
                onClick={onSignUp} 
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-md text-sm font-semibold text-black bg-gray-200 hover:bg-white focus:outline-none transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
             >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mx-auto"></div>
                ) : (
                    'Create Account'
                )}
            </button>
        </div>
      </div>
       <p className="mt-8 text-center text-sm text-gray-600">Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className="font-medium text-blue-500 hover:text-blue-400">Sign In</a></p>
    </div>
  );
};

const Header = ({ user, setPage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLinkClick = (page) => {
    setPage(page);
    setIsDropdownOpen(false);
  }

  return (
  <header className="flex items-center justify-between p-4 sticky top-0 bg-black/50 backdrop-blur-xl z-10 max-w-7xl mx-auto w-full border-b border-gray-900/50">
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage('dashboard')}>
        <div className="flex justify-center items-center">
            <h1 className="text-xl font-bold tracking-tighter text-white">REC</h1>
            <div className="mx-1 h-6 w-6 flex items-center justify-center">
                <Mic className="h-4 w-4 text-indigo-500" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter text-white">CORE</h1>
        </div>
    </div>
    <div className="relative w-full max-w-sm hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <input type="text" placeholder="Search meetings..." className="w-full pl-9 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative" ref={dropdownRef}>
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-9 w-9 rounded-full cursor-pointer border-2 border-gray-800 hover:border-indigo-500 transition-colors" 
        />
        <div 
          className={`absolute right-0 mt-2 w-48 bg-gray-950 rounded-md shadow-lg py-1 z-20 border border-gray-800 transition-all duration-200 origin-top-right ${isDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
            <p className="font-semibold text-white">{user.name}</p>
          </div>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('settings'); }} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"><Settings className="mr-2 h-4 w-4" /> Account Settings</a>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('login'); }} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"><LogOut className="mr-2 h-4 w-4" /> Log Out</a>
        </div>
      </div>
    </div>
  </header>
  )
};

const Dashboard = ({ user, meetings, onSelectMeeting, setPage }) => (
  <>
    <Header user={user} setPage={setPage} />
    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {meetings.length > 0 ? (
        <>
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-white tracking-tight">Hi, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-500 mt-1">Ready to capture some brilliant ideas?</p>
          </div>

          <div className="relative mb-12 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-gray-950 rounded-lg">
                <LinkIcon className="absolute left-4 h-5 w-5 text-gray-600" />
                <input type="text" placeholder="Paste a meeting URL to start recording..." className="w-full pl-12 pr-40 py-4 bg-transparent border-none rounded-lg focus:ring-0 outline-none" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Mic className="h-4 w-4" />
                    <span>Record</span>
                </button>
              </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-5 border-b border-gray-900 pb-3">Recent Meetings</h2>
            <div className="space-y-2">
              {meetings.map(meeting => (
                <div key={meeting.id} onClick={() => onSelectMeeting(meeting)} className="p-4 rounded-lg cursor-pointer hover:bg-gray-900/50 transition-all duration-300 group hover:border-indigo-500 border border-transparent">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div className="flex-grow mb-3 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">{meeting.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                         <span className="flex items-center">
                           {meeting.platform === 'Zoom' ? <Video className="h-4 w-4 mr-1.5 text-blue-500" /> : <Video className="h-4 w-4 mr-1.5 text-green-500" />}
                           {meeting.platform}
                         </span>
                         <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5" /> {meeting.duration}</span>
                         <span className="flex items-center"><Users className="h-4 w-4 mr-1.5" /> {meeting.attendees} Attendees</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-sm text-left sm:text-right">
                      <p className="text-gray-500">{new Date(meeting.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <DashboardEmptyState />
      )}
    </main>
  </>
);

const DashboardEmptyState = () => (
    <div className="text-center py-20 px-4">
        <div className="inline-block p-5 bg-gray-900/50 rounded-full border border-gray-800">
            <Mic className="h-12 w-12 text-indigo-500" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white">Your recordings will appear here</h2>
        <p className="mt-2 text-gray-500">To get started, paste a meeting link in the field above and click "Record".</p>
        <div className="mt-8">
            <button className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-700 transition-colors duration-200">
                Learn More
            </button>
        </div>
    </div>
);

const MeetingDetails = ({ meeting, onBack }) => (
  <div className="max-w-7xl mx-auto">
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row justify-between sm:items-center">
      <div className="flex-grow">
        <button onClick={onBack} className="text-indigo-400 hover:text-indigo-300 text-sm mb-3 inline-flex items-center transition-colors">&larr; <span className="ml-1">All Meetings</span></button>
        <h1 className="text-3xl font-bold text-white tracking-tight">{meeting.title}</h1>
        <p className="text-gray-500 mt-1">{new Date(meeting.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
      </div>
      <div className="flex items-center space-x-2 mt-4 sm:mt-0">
        <button className="p-2 rounded-md hover:bg-gray-900 transition-colors"><Share2 className="h-5 w-5 text-gray-500 hover:text-white" /></button>
        <button className="p-2 rounded-md hover:bg-gray-900 transition-colors"><Download className="h-5 w-5 text-gray-500 hover:text-white" /></button>
        <button className="p-2 rounded-md hover:bg-gray-900 transition-colors"><Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" /></button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 sm:p-6 lg:p-8">
      <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 self-start">
        <InsightCard icon={<Zap />} title="AI Summary" content={meeting.summary} />
        <InsightCard icon={<Target />} title="Action Items">
          <ul className="space-y-4">
            {meeting.actionItems.map(item => (
              <li key={item.id} className="flex items-start text-sm">
                <CheckCircle className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${item.completed ? 'text-green-500' : 'text-gray-600'}`} />
                <div>
                  <p className={`${item.completed ? 'line-through text-gray-600' : 'text-gray-300'}`}>{item.text}</p>
                  <span className="text-xs text-gray-500">{item.owner}</span>
                </div>
              </li>
            ))}
          </ul>
        </InsightCard>
        <InsightCard icon={<FileText />} title="Key Topics">
            <div className="flex flex-wrap gap-2">
                {meeting.keyTopics.map(topic => (
                    <span key={topic} className="bg-gray-800 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded">{topic}</span>
                ))}
            </div>
        </InsightCard>
      </div>

      <div className="lg:col-span-2 bg-gray-950/50 border border-gray-800/50 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6 text-white">Transcript</h2>
        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4 -mr-4">
          {meeting.transcript.map((entry, index) => (
            <div key={index} className="flex items-start gap-4 text-sm group">
              <p className="font-mono text-xs text-gray-600 group-hover:text-indigo-400 transition-colors w-20 text-right pt-1">{entry.time}</p>
              <div className="flex-grow border-l border-gray-800 pl-4">
                <p className="font-semibold text-white mb-1">{entry.speaker}</p>
                <p className="text-gray-400 leading-relaxed">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AccountSettingsPage = ({ user, setUser, setPage }) => {
    const [activeTab, setActiveTab] = useState('profile');
    
    const renderContent = () => {
        switch(activeTab) {
            case 'profile':
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-6">Update your personal details.</p>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-400">Full Name</label>
                                <input type="text" defaultValue={user.name} className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-400">Email Address</label>
                                <input type="email" defaultValue={user.email} className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div className="pt-2">
                                <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Save Changes</button>
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-white">Security</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-6">Manage your password and account security.</p>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-400">Current Password</label>
                                <input type="password" placeholder="••••••••" className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-400">New Password</label>
                                <input type="password" placeholder="••••••••" className="mt-1 block w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                            </div>
                            <div className="pt-2">
                                <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Update Password</button>
                            </div>
                        </div>
                         <div className="mt-10 border-t border-red-500/30 pt-6">
                            <h4 className="text-lg font-semibold text-red-400">Delete Account</h4>
                            <p className="text-sm text-gray-500 mt-1 mb-4">Permanently delete your account and all of your data. This action cannot be undone.</p>
                             <button className="bg-red-600/20 text-red-400 border border-red-500/50 font-semibold py-2 px-4 rounded-md hover:bg-red-600/30 hover:text-red-300 transition-colors">Delete My Account</button>
                        </div>
                    </div>
                );
            case 'billing':
                 return (
                    <div>
                        <h3 className="text-lg font-semibold text-white">Billing & Subscription</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-6">Manage your plan and payment details.</p>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-400">Your Plan</p>
                                    <p className="text-xl font-semibold text-white">Pro Plan</p>
                                </div>
                                <p className="text-2xl font-bold text-white">$15<span className="text-base font-normal text-gray-500">/mo</span></p>
                            </div>
                             <div className="mt-4 text-sm text-gray-400">
                                <p>Your plan renews on October 26, 2025.</p>
                            </div>
                             <div className="mt-6 flex space-x-4">
                                <button className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Change Plan</button>
                                <button className="text-gray-400 font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">Cancel Subscription</button>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: UserIcon },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];
    
    return (
        <>
        <Header user={user} setPage={setPage} />
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-4xl font-bold text-white tracking-tight mb-8">Account Settings</h1>
            <div className="flex flex-col lg:flex-row gap-12">
                <aside className="lg:w-1/4">
                    <nav className="flex flex-row lg:flex-col gap-1">
                        {tabs.map(tab => (
                             <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center p-3 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-900/50'}`}>
                                <tab.icon className={`h-5 w-5 mr-3 ${activeTab === tab.id ? 'text-indigo-400' : ''}`} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </aside>
                <div className="flex-1">
                   {renderContent()}
                </div>
            </div>
        </main>
        </>
    );
};


const InsightCard = ({ icon, title, content, children }) => (
    <div>
        <h2 className="text-lg font-semibold mb-4 text-white flex items-center">
            <span className="mr-3 p-2 bg-gray-800/50 rounded-md border border-gray-700/50">{React.cloneElement(icon, { className: "h-5 w-5 text-indigo-400" })}</span>
            {title}
        </h2>
        {content && <p className="text-gray-400 leading-relaxed text-sm">{content}</p>}
        {children}
    </div>
);


const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto animate-pulse">
    <div className="flex items-center justify-between p-4 border-b border-gray-900/50">
      <div className="h-6 w-32 bg-gray-900 rounded"></div>
      <div className="h-9 w-9 bg-gray-900 rounded-full"></div>
    </div>
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="h-10 w-1/3 bg-gray-900 rounded mb-2"></div>
      <div className="h-5 w-1/2 bg-gray-900 rounded mb-10"></div>
      <div className="h-16 w-full bg-gray-900 rounded-lg mb-12"></div>
      <div className="h-8 w-1/4 bg-gray-900 rounded mb-5"></div>
      <div className="space-y-2">
        <div className="h-24 bg-gray-900 rounded-lg"></div>
        <div className="h-24 bg-gray-900 rounded-lg"></div>
        <div className="h-24 bg-gray-900 rounded-lg"></div>
      </div>
    </div>
  </div>
);
