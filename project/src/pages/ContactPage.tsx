import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Building2, User } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error Sending Message",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <section className="pt-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card className="p-12 bg-card-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-muted-foreground">
                Transform your healthcare operations with Ron AI. Contact us to learn more about our solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 bg-card-custom">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-full">
                    <Mail className="h-8 w-8 text-[#00F0FF]" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">tim@hi-ron.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card-custom">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-full">
                    <Phone className="h-8 w-8 text-[#00F0FF]" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="text-muted-foreground">+1 (385) 201-5802</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card-custom">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-[#00F0FF]/10 rounded-full">
                    <MapPin className="h-8 w-8 text-[#00F0FF]" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="text-muted-foreground">Salt Lake City, Utah</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-12 bg-card-custom">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <User className="h-5 w-5 text-[#003649] dark:text-[#00F0FF]" />
                        </div>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-11 h-12 bg-white dark:bg-[#111111]/80 backdrop-blur-xl border-[#003649]/50 dark:border-white/10 hover:border-[#003649] dark:hover:border-[#00F0FF]/50 focus:border-[#003649] dark:focus:border-[#00F0FF] focus:ring-[#003649]/20 dark:focus:ring-[#00F0FF]/20 transition-all duration-300 text-foreground dark:text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Mail className="h-5 w-5 text-[#003649] dark:text-[#00F0FF]" />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-11 h-12 bg-white dark:bg-[#111111]/80 backdrop-blur-xl border-[#003649]/50 dark:border-white/10 hover:border-[#003649] dark:hover:border-[#00F0FF]/50 focus:border-[#003649] dark:focus:border-[#00F0FF] focus:ring-[#003649]/20 dark:focus:ring-[#00F0FF]/20 transition-all duration-300 text-foreground dark:text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-medium">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Phone className="h-5 w-5 text-[#003649] dark:text-[#00F0FF]" />
                        </div>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-11 h-12 bg-white dark:bg-[#111111]/80 backdrop-blur-xl border-[#003649]/50 dark:border-white/10 hover:border-[#003649] dark:hover:border-[#00F0FF]/50 focus:border-[#003649] dark:focus:border-[#00F0FF] focus:ring-[#003649]/20 dark:focus:ring-[#00F0FF]/20 transition-all duration-300 text-foreground dark:text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-base font-medium">
                        Company Name
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Building2 className="h-5 w-5 text-[#003649] dark:text-[#00F0FF]" />
                        </div>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={handleChange}
                          className="pl-11 h-12 bg-white dark:bg-[#111111]/80 backdrop-blur-xl border-[#003649]/50 dark:border-white/10 hover:border-[#003649] dark:hover:border-[#00F0FF]/50 focus:border-[#003649] dark:focus:border-[#00F0FF] focus:ring-[#003649]/20 dark:focus:ring-[#00F0FF]/20 transition-all duration-300 text-foreground dark:text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-medium">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your needs..."
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px] dark:bg-[#111111]/80 backdrop-blur-xl dark:border-white/10 border-[#00F0FF]/50 dark:hover:border-[#00F0FF]/50 focus:border-[#00F0FF] focus:ring-[#00F0FF]/20 transition-all duration-300 dark:text-white text-foreground placeholder:text-gray-500 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-8 py-6 text-lg bg-[#00F0FF]/20 hover:bg-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/50 hover:border-[#00F0FF] transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </Card>
      </section>
    </div>
  );
}