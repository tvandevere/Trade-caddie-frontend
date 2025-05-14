"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BarChart2, ShieldCheck, CheckCircle, BookOpen, Users, Brain, TrendingUp, PlayCircle, ArrowRight } from 'lucide-react'; 
import ThemeAwareLogo from '@/components/ui/ThemeAwareLogo';
import TipOfTheDay from '@/components/mvp/TipOfTheDay'; // Import TipOfTheDay

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-3">
            <ThemeAwareLogo 
              alt="Trade Caddie Logo" 
              width={50} 
              height={50} 
              className="rounded-sm object-contain"
            />
            <span className="font-bold text-xl text-primary">Trade Caddie</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <Button asChild variant="default">
            <Link href="/auth/login">Login / Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-background">
          <div 
            className="absolute inset-0 opacity-5 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: 'url(/trade_caddie_logo_default_white_bg.png)', 
              backgroundSize: '50%', 
              filter: 'blur(100px)' 
            }}
          ></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
              Your AI <span className="text-primary">Trade Caddie</span>: Master Your Trading Day, Every Day.
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground">
              Stop guessing, start growing. Trade Caddie is your dedicated AI Day Trading Agent, guiding you through pre-market prep, live market action, and post-market review with personalized insights and actionable advice.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto shadow-lg hover:shadow-primary/30 transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground btn-primary-glow">
                <Link href="/auth/register">Meet Your Caddie (Free Trial) <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="#how-it-works">See How It Works <PlayCircle className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Tip of the Day Section - Added Here */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <TipOfTheDay />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Your Trading Day, Transformed by Your AI Caddie</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Trade Caddie isn't just another tool; it's your partner, actively guiding you through each phase of your trading day for peak performance and continuous learning.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <Card className="p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/10 transition-shadow flex flex-col items-start">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Zap size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Pre-Market Power-Up</h3>
                <p className="text-muted-foreground text-sm">
                  Your Caddie delivers AI-curated market overviews, identifies key levels on your watchlist, and helps you build a personalized game plan. Start your day focused and prepared.
                </p>
              </Card>
              <Card className="p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/10 transition-shadow flex flex-col items-start">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <BarChart2 size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. In-Market Intelligence</h3>
                <p className="text-muted-foreground text-sm">
                  Navigate live markets with your Caddie providing real-time trade ideas, sentiment analysis, and crucial alerts. Manage trades, emotions, and opportunities with AI by your side.
                </p>
              </Card>
              <Card className="p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/10 transition-shadow flex flex-col items-start">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <ShieldCheck size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">3. Post-Market Mastery</h3>
                <p className="text-muted-foreground text-sm">
                  Debrief with your Caddie. Analyze performance, understand decisions, reinforce wins, and get tailored learning resources to accelerate your growth as a trader.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Trade Caddie is Your Ultimate Trading Partner</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Trade Caddie combines cutting-edge AI with a structured, supportive approach to help you trade smarter, not harder.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-left p-6 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <div className="flex items-center justify-start h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <Brain size={28} className="text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Proactive AI Guidance</CardTitle>
                <CardContent className="text-sm text-muted-foreground p-0">
                  Your Caddie doesn’t just react; it anticipates your needs, offering timely insights, educational prompts, and strategic advice throughout your trading day.
                </CardContent>
              </Card>
              <Card className="text-left p-6 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <div className="flex items-center justify-start h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <TrendingUp size={28} className="text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Personalized Trade Insights</CardTitle>
                <CardContent className="text-sm text-muted-foreground p-0">
                  Receive AI-vetted trade ideas tailored to your style, complete with clear rationale, entry/exit points, and risk considerations, all discussed with your Caddie.
                </CardContent>
              </Card>
              <Card className="text-left p-6 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <div className="flex items-center justify-start h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <BookOpen size={28} className="text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Adaptive Learning Journey</CardTitle>
                <CardContent className="text-sm text-muted-foreground p-0">
                  Access curated educational content. Your Caddie learns with you, suggesting relevant materials based on your trades, questions, and learning progress.
                </CardContent>
              </Card>
              <Card className="text-left p-6 shadow-lg hover:shadow-xl transition-shadow bg-card">
                <div className="flex items-center justify-start h-12 w-12 rounded-full bg-primary/10 mb-4">
                  <Users size={28} className="text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">Supportive Community</CardTitle>
                <CardContent className="text-sm text-muted-foreground p-0">
                  Connect with fellow traders, share insights, and track progress on the leaderboard. Your Caddie helps facilitate a collaborative learning environment.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Simple, Transparent Pricing</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Choose the plan that fits your journey. Start free, upgrade for advanced AI features and deeper insights.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="p-8 bg-card rounded-xl shadow-lg border-2 border-transparent hover:border-primary/50 transition-all">
                        <h3 className="text-2xl font-semibold text-primary mb-2">Free Tier</h3>
                        <p className="text-4xl font-bold text-foreground mb-1">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                        <p className="text-muted-foreground mb-6">Get started with core Caddie features.</p>
                        <ul className="space-y-2 text-muted-foreground mb-8">
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Basic AI Caddie Guidance</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Pre-Market Checklist</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Limited Trade Journaling</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Access to Core Education</li>
                        </ul>
                        <Button size="lg" variant="outline" className="w-full" asChild>
                            <Link href="/auth/register">Get Started for Free</Link>
                        </Button>
                    </Card>
                    <Card className="p-8 bg-card rounded-xl shadow-2xl border-2 border-primary transition-all">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-2xl font-semibold text-primary">Pro Caddie</h3>
                            <span className="text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground py-1 px-3 rounded-full">Most Popular</span>
                        </div>
                        <p className="text-4xl font-bold text-foreground mb-1">$49<span className="text-lg font-normal text-muted-foreground">.99/month</span></p>
                        <p className="text-muted-foreground mb-6">Unlock the full power of your AI Trade Caddie.</p>
                        <ul className="space-y-2 text-muted-foreground mb-8">
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> <span className="font-semibold text-foreground">Advanced</span> AI Caddie Insights</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Personalized Trade Ideas</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Unlimited Trade Journaling & Analysis</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Full Education Library & Custom Paths</li>
                            <li className="flex items-center"><CheckCircle className="w-5 h-5 text-primary mr-2" /> Community Leaderboard & Pro Features</li>
                        </ul>
                        <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg btn-primary-glow" asChild>
                            <Link href="/auth/register">Go Pro Caddie</Link>
                        </Button>
                    </Card>
                </div>
            </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Ready to Elevate Your Trading with an AI Partner?</h2>
            <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
              Your Trade Caddie is ready to help you navigate the markets with more confidence and skill. Start your free trial today – no credit card required.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild className="w-full sm:w-auto shadow-lg hover:shadow-primary/30 transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground btn-primary-glow">
                <Link href="/auth/register">Start My Free Trial Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <ThemeAwareLogo 
              alt="Trade Caddie Logo" 
              width={30} 
              height={30} 
              className="rounded-sm object-contain"
            />
            <p>&copy; {new Date().getFullYear()} Trade Caddie. All Rights Reserved.</p>
          </div>
          <p>Disclaimer: Trading involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

