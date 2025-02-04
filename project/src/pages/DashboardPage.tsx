import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, MessageSquare, Settings, Users, Clock, Activity, FileText, CheckCircle, AlertTriangle, Calendar, Brain, Zap, Shield, Bot, Database, Network } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("provider");
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [authFormData, setAuthFormData] = useState({
    patientName: "John Smith",
    procedure: "",
    diagnosis: "",
    notes: "",
    documents: null as File | null
  });
  const [aiAgents, setAiAgents] = useState([
    {
      id: "clinical",
      name: "Clinical Decision Agent",
      icon: Brain,
      status: "idle",
      accuracy: 98.5,
      tasksCompleted: 1234,
      activeRequests: 12,
      description: "Analyzes clinical documentation and medical necessity",
      capabilities: [
        "Natural Language Processing",
        "Clinical Guidelines Validation",
        "Medical Necessity Assessment"
      ]
    },
    {
      id: "document",
      name: "Documentation Agent",
      icon: FileText,
      status: "idle",
      accuracy: 99.1,
      tasksCompleted: 2156,
      activeRequests: 8,
      description: "Processes and validates medical documentation",
      capabilities: [
        "Document Classification",
        "Information Extraction",
        "Completeness Verification"
      ]
    },
    {
      id: "policy",
      name: "Policy Validation Agent",
      icon: Shield,
      status: "idle",
      accuracy: 97.8,
      tasksCompleted: 1876,
      activeRequests: 15,
      description: "Ensures compliance with payer policies",
      capabilities: [
        "Policy Matching",
        "Requirements Validation",
        "Coverage Verification"
      ]
    },
    {
      id: "integration",
      name: "Integration Agent",
      icon: Network,
      status: "idle",
      accuracy: 99.5,
      tasksCompleted: 3421,
      activeRequests: 5,
      description: "Manages system integrations and data flow",
      capabilities: [
        "API Management",
        "Data Transformation",
        "System Synchronization"
      ]
    }
  ]);

  const demoSteps = [
    {
      title: "Document Analysis",
      description: "AI agents analyzing clinical documentation",
      duration: 3000,
      agentUpdates: [
        { id: "clinical", status: "processing" },
        { id: "document", status: "processing" }
      ]
    },
    {
      title: "Policy Validation",
      description: "Validating against payer policies",
      duration: 2500,
      agentUpdates: [
        { id: "clinical", status: "complete" },
        { id: "policy", status: "processing" }
      ]
    },
    {
      title: "Integration",
      description: "Processing system integrations",
      duration: 2000,
      agentUpdates: [
        { id: "document", status: "complete" },
        { id: "integration", status: "processing" }
      ]
    },
    {
      title: "Completion",
      description: "Authorization approved",
      duration: 1500,
      agentUpdates: [
        { id: "policy", status: "complete" },
        { id: "integration", status: "complete" }
      ]
    }
  ];

  const { toast } = useToast();

  const runDemoStep = useCallback((step: number) => {
    if (step >= demoSteps.length) {
      setProcessingStatus('complete');
      toast({
        title: "Prior Authorization Approved",
        description: "All processing steps completed successfully.",
      });
      return;
    }

    const currentDemoStep = demoSteps[step];
    
    // Update agent statuses
    setAiAgents(prev => prev.map(agent => {
      const update = currentDemoStep.agentUpdates.find(u => u.id === agent.id);
      return update ? { ...agent, status: update.status } : agent;
    }));

    // Show step notification
    toast({
      title: currentDemoStep.title,
      description: currentDemoStep.description,
    });

    // Schedule next step
    setTimeout(() => {
      setCurrentStep(step + 1);
      runDemoStep(step + 1);
    }, currentDemoStep.duration);
  }, [toast, demoSteps]);

  const startDemo = useCallback(() => {
    setDemoMode(true);
    setProcessingStatus('processing');
    setCurrentStep(0);
    runDemoStep(0);
  }, [runDemoStep]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuthForm(false);
    startDemo();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAuthFormData(prev => ({ ...prev, documents: file }));
      toast({
        title: "Document Uploaded",
        description: file.name,
      });
    }
  };

  const performanceData = [
    { month: "Jan", authorizations: 450, approvals: 380, time: 45 },
    { month: "Feb", authorizations: 520, approvals: 450, time: 42 },
    { month: "Mar", authorizations: 600, approvals: 550, time: 38 },
    { month: "Apr", authorizations: 580, approvals: 520, time: 35 },
    { month: "May", authorizations: 650, approvals: 600, time: 32 },
    { month: "Jun", authorizations: 720, approvals: 680, time: 30 }
  ];

  const pieData = [
    { name: "Instant Approval", value: 65 },
    { name: "Quick Review", value: 25 },
    { name: "Manual Review", value: 10 }
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  const notifications = [
    {
      id: 1,
      title: "Prior Authorization Request",
      message: "New request for MRI scan",
      time: "2 min ago",
      type: "request"
    },
    {
      id: 2,
      title: "Approval Notice",
      message: "PA-2024-001 has been approved",
      time: "10 min ago",
      type: "approval"
    }
  ];

  const pendingAuths = [
    {
      id: "PA-2024-003",
      patient: "Sarah Johnson",
      procedure: "CT Scan",
      status: "pending",
      submitted: "2024-03-20"
    },
    {
      id: "PA-2024-002",
      patient: "Michael Brown",
      procedure: "MRI",
      status: "approved",
      submitted: "2024-03-19"
    }
  ];

  const stats = [
    { icon: Users, label: "Total Patients", value: "1,234" },
    { icon: Clock, label: "Avg. Response Time", value: "2.5m" },
    { icon: Activity, label: "Success Rate", value: "98%" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto mb-8">
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="payer">Payer</TabsTrigger>
            <TabsTrigger value="patient">Patient</TabsTrigger>
          </TabsList>

          <TabsContent value="provider">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  icon: Brain,
                  label: "AI Agents Active",
                  value: aiAgents.filter(a => a.status === "processing").length.toString(),
                  change: "+2 from last hour"
                },
                {
                  icon: Zap,
                  label: "Avg Processing Time",
                  value: "32s",
                  change: "-15% from last month"
                },
                {
                  icon: CheckCircle,
                  label: "Approval Rate",
                  value: "94.5%",
                  change: "+2.3% from last month"
                }
              ].map((stat, i) => (
                <Card key={i} className="p-6 bg-card-custom relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/10">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ 
                        width: demoMode ? `${(currentStep + 1) * 25}%` : '0%'
                      }}
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {aiAgents.map((agent) => (
                <Card 
                  key={agent.id}
                  className={`p-6 bg-card-custom cursor-pointer transition-all duration-300 ${
                    agent.status === 'processing' ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => {
                    setSelectedAgent(agent.id);
                    setShowAgentDetails(true);
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-lg mb-4 ${
                      agent.status === 'processing' 
                        ? 'bg-primary/20 animate-pulse' 
                        : agent.status === 'complete'
                        ? 'bg-green-500/20'
                        : 'bg-primary/10'
                    }`}>
                      <agent.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{agent.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        agent.status === 'processing'
                          ? 'bg-primary/20 text-primary'
                          : agent.status === 'complete'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {agent.status}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {agent.activeRequests} active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {agent.accuracy}% accuracy
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 bg-card-custom">
                <h3 className="text-lg font-semibold mb-4">Processing Performance</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis 
                        dataKey="month" 
                        stroke="hsl(var(--muted))"
                        style={{
                          fontSize: '12px',
                          fontFamily: 'inherit'
                        }}
                        tick={{ fill: "hsl(var(--muted))" }}
                        axisLine={{ stroke: "hsl(var(--muted))" }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted))"
                        style={{
                          fontSize: '12px',
                          fontFamily: 'inherit'
                        }}
                        tick={{ fill: "hsl(var(--muted))" }}
                        axisLine={{ stroke: "hsl(var(--muted))" }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))'
                        }}
                        labelStyle={{
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ 
                          fill: "hsl(var(--primary))",
                          stroke: "hsl(var(--primary))"
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 bg-card-custom">
                <h3 className="text-lg font-semibold mb-4">Authorization Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--background))',
                          border: '1px solid hsl(var(--border))'
                        }}
                        labelStyle={{
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Prior Authorizations and Notifications */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <Card className="md:col-span-8 p-6 bg-card-custom">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Prior Authorizations</h2>
                  <Button onClick={() => setShowAuthForm(true)}>
                    New Request
                  </Button>
                </div>
                <div className="space-y-4">
                  {pendingAuths.map((auth) => (
                    <Card key={auth.id} className="p-4 bg-card-custom">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{auth.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {auth.procedure} - {auth.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            auth.status === 'approved' 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {auth.status}
                          </span>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="md:col-span-4 p-6 bg-card-custom">
                <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card key={notification.id} className="p-4 bg-card-custom">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'approval'
                            ? 'bg-green-500/10'
                            : 'bg-blue-500/10'
                        }`}>
                          {notification.type === 'approval' ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <FileText className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payer">
            <Card className="p-6 bg-card-custom">
              <h2 className="text-lg font-semibold mb-6">Payer Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4 bg-card-custom">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                      <p className="text-xl font-bold">24</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card-custom">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-500/10">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Approved Today</p>
                      <p className="text-xl font-bold">18</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card-custom">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-yellow-500/10">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Requires Review</p>
                      <p className="text-xl font-bold">6</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="patient">
            <Card className="p-6 bg-card-custom">
              <h2 className="text-lg font-semibold mb-6">Patient Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-card-custom">
                  <h3 className="text-md font-medium mb-4">Upcoming Appointments</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">MRI Scan</p>
                        <p className="text-sm text-muted-foreground">March 25, 2024 - 2:30 PM</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-card-custom">
                  <h3 className="text-md font-medium mb-4">Authorization Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-500/10">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">MRI Authorization Approved</p>
                        <p className="text-sm text-muted-foreground">Valid until April 25, 2024</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Prior Authorization Form Modal */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold">New Prior Authorization Request</h2>
              <p className="text-sm text-muted-foreground">
                Submit a new prior authorization request for your patient.
              </p>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={authFormData.patientName}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="procedure">Procedure</Label>
                <Select
                  value={authFormData.procedure}
                  onValueChange={(value) => 
                    setAuthFormData(prev => ({ ...prev, procedure: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select procedure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mri">MRI Scan</SelectItem>
                    <SelectItem value="ct">CT Scan</SelectItem>
                    <SelectItem value="xray">X-Ray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis Code</Label>
                <Input
                  id="diagnosis"
                  value={authFormData.diagnosis}
                  onChange={(e) => 
                    setAuthFormData(prev => ({ ...prev, diagnosis: e.target.value }))
                  }
                  placeholder="Enter ICD-10 code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Clinical Notes</Label>
                <Textarea
                  id="notes"
                  value={authFormData.notes}
                  onChange={(e) => 
                    setAuthFormData(prev => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Enter clinical notes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents</Label>
                <Input
                  id="documents"
                  type="file"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAuthForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}