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
      <div className="absolute w-[441px] h-[1130px] top-[-342px] left-[346px] rotate-[90.24deg] blur-[125px] [background:conic-gradient(from_226deg_at_50%_50%,rgba(81,55,108,0.43)_6%,rgba(159,36,109,0.45)_42%,rgba(159,36,109,0.44)_44%,rgba(229,41,150,0.45)_58%,rgba(27,79,144,0.43)_75%,rgba(42,64,108,0.42)_87%)]" />

      <div className="flex w-full max-w-[1068px] h-[440px] items-center justify-center gap-[22px] mx-auto mt-2.5">
        <div className="relative w-[253.24px] h-[303.29px] bg-[url(https://c.animaapp.com/mecm5afmnFTEcQ/img/img.png)] bg-cover bg-[50%_50%]" />

        <div className="flex flex-col items-start gap-2.5 flex-1">
          <div className="flex flex-col items-center justify-center gap-2.5 w-full">
            <h1 className="w-full [font-family:'Vazirmatn',Helvetica] font-black text-white text-[40px] tracking-[0] leading-[52px]">
              Join Our Platform
            </h1>

            <div className="w-full font-text-big font-[number:var(--text-big-font-weight)] text-transparent text-[length:var(--text-big-font-size)] text-justify tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] [font-style:var(--text-big-font-style)]">
              <span className="text-white font-text-big [font-style:var(--text-big-font-style)] font-[number:var(--text-big-font-weight)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] text-[length:var(--text-big-font-size)]">
                You can be one of the{" "}
              </span>

              <span className="text-[#ee0faf] font-text-big [font-style:var(--text-big-font-style)] font-[number:var(--text-big-font-weight)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] text-[length:var(--text-big-font-size)]">
                members
              </span>

              <span className="text-white font-text-big [font-style:var(--text-big-font-style)] font-[number:var(--text-big-font-weight)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] text-[length:var(--text-big-font-size)]">
                {" "}
                of our platform by just adding some necessarily information. if
                you already have an account on our website, you can just hit the{" "}
              </span>

              <span className="text-[#0d9eef] font-text-big [font-style:var(--text-big-font-style)] font-[number:var(--text-big-font-weight)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] text-[length:var(--text-big-font-size)]">
                Login button
              </span>

              <span className="text-white font-text-big [font-style:var(--text-big-font-style)] font-[number:var(--text-big-font-weight)] tracking-[var(--text-big-letter-spacing)] leading-[var(--text-big-line-height)] text-[length:var(--text-big-font-size)]">
                .
              </span>
            </div>
          </div>
        </div>

        <Card className="flex-1 h-[440px] bg-[#21061b] rounded-xl border-0">
          <CardContent className="flex flex-col h-full items-start gap-4 p-[25px] pt-4">
            <div className="flex flex-col items-start gap-4 w-full h-[396px]">
              <div className="flex flex-col items-center gap-2 w-full">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex items-center justify-center gap-4 w-full bg-transparent p-0 h-auto">
                    <TabsTrigger
                      value="signup"
                      className="flex flex-col items-start gap-[3px] bg-transparent p-0 data-[state=active]:bg-transparent"
                    >
                      <div className="w-[84px] font-heading-1 font-[number:var(--heading-1-font-weight)] text-[#ee0faf] text-[length:var(--heading-1-font-size)] text-justify tracking-[var(--heading-1-letter-spacing)] leading-[var(--heading-1-line-height)] [font-style:var(--heading-1-font-style)]">
                        Sign Up
                      </div>
                      <img
                        className="w-full h-[3px]"
                        alt="Line"
                        src="https://c.animaapp.com/mecm5afmnFTEcQ/img/line-30.svg"
                      />
                    </TabsTrigger>

                    <TabsTrigger
                      value="login"
                      className="w-[68px] font-heading-2 font-[number:var(--heading-2-font-weight)] text-light-active text-[length:var(--heading-2-font-size)] text-center tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)] bg-transparent p-0 data-[state=active]:bg-transparent"
                    >
                      Login
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signup" className="mt-4 space-y-4">
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex flex-col items-center justify-center gap-2 flex-1">
                        <Label className="w-full font-[number:var(--heading-3-font-weight)] text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] font-heading-3 text-white leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
                          Name
                        </Label>

                        <div className="flex flex-col items-start justify-center gap-2.5 pl-2 pr-1 py-2 w-full rounded border-2 border-solid border-[#d9d9d9]">
                          <div className="flex items-center gap-1 w-full">
                            <img
                              className="w-6 h-6"
                              alt="Mi user"
                              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/mi-user.svg"
                            />

                            <div className="w-[109px] opacity-75 [font-family:'Vazirmatn',Helvetica] font-normal text-white text-[10px] text-justify tracking-[0] leading-[normal]">
                              Enter Your Name
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center gap-2 flex-1">
                        <Label className="w-full font-heading-3 font-[number:var(--heading-3-font-weight)] text-white text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
                          Number
                        </Label>

                        <div className="flex flex-col items-start justify-center gap-2.5 pl-2 pr-1 py-2 w-full rounded border-2 border-solid border-[#d9d9d9]">
                          <div className="flex items-center gap-1 w-full">
                            <img
                              className="w-6 h-6"
                              alt="Fluent call"
                              src="https://c.animaapp.com/mecm5afmnFTEcQ/img/fluent-call-28-regular.svg"
                            />

                            <div className="w-[134px] mr-[-12.31px] opacity-75 [font-family:'Vazirmatn',Helvetica] font-normal text-white text-[10px] text-justify tracking-[0] leading-[normal]">
                              Enter Your Number
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 w-full">
                      <Label className="w-full font-heading-3 font-[number:var(--heading-3-font-weight)] text-white text-[length:var(--heading-3-font-size)] tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
                        E-Mail
                      </Label>

                      <div className="flex flex-col h-10 items-start justify-center gap-2.5 pl-2 pr-1 py-2 w-full rounded border-2 border-solid border-[#d9d9d9]">
                        <div className="w-[113px] items-center justify-end flex gap-1">
                          <img
                            className="w-6 h-6"
                            alt="Octicon mail"
                            src="https://c.animaapp.com/mecm5afmnFTEcQ/img/octicon-mail-24.svg"
                          />

                          <div className="flex-1 opacity-75 [font-family:'Vazirmatn',Helvetica] font-normal text-white text-[10px] tracking-[0] leading-[normal]">
                            Enter Your E-Mail
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="login" className="mt-4">
                    <div className="text-white text-center">
                      Login form content
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex flex-col h-[164px] items-center justify-center gap-2 w-full">
                <Button className="flex h-11 items-center justify-center gap-5 px-9 py-2 w-full bg-[#ee0faf] rounded hover:bg-[#ee0faf]/90 h-auto">
                  <div className="w-fit [text-shadow:0px_2px_4px_#00000033] [font-family:'Vazirmatn',Helvetica] font-medium text-white text-lg text-right tracking-[0] leading-[normal]">
                    Sign Up
                  </div>
                </Button>

                <div className="flex items-center justify-center gap-[29px] px-0 py-3 w-full relative">
                  <div className="absolute w-[335px] -top-px left-0 font-heading-3 font-[number:var(--heading-3-font-weight)] text-white text-[length:var(--heading-3-font-size)] text-center tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
                    Or
                  </div>

                  <img
                    className="flex-1 h-px object-cover"
                    alt="Line"
                    src="https://c.animaapp.com/mecm5afmnFTEcQ/img/line-32.svg"
                  />

                  <img
                    className="flex-1 h-px object-cover"
                    alt="Line"
                    src="https://c.animaapp.com/mecm5afmnFTEcQ/img/line-32.svg"
                  />
                </div>

                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center gap-2.5 px-[155px] py-[7px] w-full rounded border-2 border-solid border-white bg-transparent hover:bg-white/10 h-auto"
                >
                  <div className="flex h-[25px] items-center justify-center gap-1.5 w-full">
                    <img
                      className="w-6 h-6 ml-[-75.81px]"
                      alt="Devicon google"
                      src="https://c.animaapp.com/mecm5afmnFTEcQ/img/devicon-google.svg"
                    />

                    <div className="w-fit ml-[-45.81px] mr-[-75.81px] font-heading-3 font-[number:var(--heading-3-font-weight)] text-white text-[length:var(--heading-3-font-size)] text-justify tracking-[var(--heading-3-letter-spacing)] leading-[var(--heading-3-line-height)] [font-style:var(--heading-3-font-style)]">
                      Sign Up With Google
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
