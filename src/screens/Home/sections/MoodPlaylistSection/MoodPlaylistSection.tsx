import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";

export const MoodPlaylistSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("signup");

  return (
    <section className="relative w-full h-[450px]">
      {/* Background Blur Gradient */}
      <div className="absolute w-[441px] h-[1130px] top-[-342px] left-[346px] rotate-[90.24deg] blur-[125px] [background:conic-gradient(from_226deg_at_50%_50%,rgba(81,55,108,0.43)_6%,rgba(159,36,109,0.45)_42%,rgba(159,36,109,0.44)_44%,rgba(229,41,150,0.45)_58%,rgba(27,79,144,0.43)_75%,rgba(42,64,108,0.42)_87%)]" />

      {/* Main Container */}
      <div className="flex w-full max-w-[1068px] h-[440px] items-center justify-center gap-[22px] mx-auto mt-2.5">
        
        {/* Left Image */}
        <div className="relative w-[253px] h-[303px] bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/img.png)] bg-cover bg-center rounded" />

        {/* Center Text */}
        <div className="flex flex-col flex-1 gap-4 justify-center">
          <h1 className="text-white font-black text-[40px] leading-[52px]">
            Join Our Platform
          </h1>

          <p className="text-white text-[14px] leading-[20px]">
            You can be one of the <span className="text-[#ee0faf]">members</span> of our platform by just adding some necessary information. If you already have an account, you can hit the <span className="text-[#0d9eef]">Login button</span>.
          </p>
        </div>

        {/* Right Card */}
        <Card className="flex-1 h-full bg-[#21061b] rounded-xl border-0">
          <CardContent className="flex flex-col h-full justify-between p-6 gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              {/* Tab Triggers */}
              <TabsList className="flex justify-between gap-4 mb-4">
                <TabsTrigger value="signup" className="text-[#ee0faf]">Sign Up</TabsTrigger>
                <TabsTrigger value="login" className="text-white">Login</TabsTrigger>
              </TabsList>

              {/* Tab Contents */}
              <div className="flex-1 flex flex-col gap-4">
                <TabsContent value="signup" className="flex-1 flex flex-col gap-4">
                  {/* Name & Number Fields */}
                  <div className="flex gap-3">
                    <div className="flex-1 flex flex-col gap-2">
                      <Label>Name</Label>
                      <input className="w-full p-2 rounded border border-gray-400" placeholder="Enter Your Name" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <Label>Number</Label>
                      <input className="w-full p-2 rounded border border-gray-400" placeholder="Enter Your Number" />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-2">
                    <Label>E-Mail</Label>
                    <input className="w-full p-2 rounded border border-gray-400" placeholder="Enter Your E-Mail" />
                  </div>
                </TabsContent>

                <TabsContent value="login" className="flex-1 flex items-center justify-center text-white">
                  Login form content
                </TabsContent>
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col gap-3 mt-4">
                {/* Sign Up Button */}
                <Button className="w-full bg-[#ee0faf] hover:bg-[#ee0faf]/90">Sign Up</Button>

                {/* Or Divider */}
                <div className="flex items-center justify-center gap-3">
                  <hr className="flex-1 border-white/30" />
                  <span className="text-white text-sm">Or</span>
                  <hr className="flex-1 border-white/30" />
                </div>

                {/* Google Sign Up */}
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-white">
                  <img className="w-6 h-6" src="https://c.animaapp.com/mecm5afmnFTEcQ/img/devicon-google.svg" alt="Google" />
                  Sign Up With Google
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
