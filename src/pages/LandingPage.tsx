import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Brain,
  Zap,
  BookOpen,
  Target,
  Sparkles,
  FileUp,
  CheckCircle2,
  ArrowRight,
  Play,
  Users,
  Clock,
  TrendingUp,
  Star,
  Award,
  Menu,
  X,
  FileText,
  Video,
  Rocket,
} from 'lucide-react';
import { LOGO } from '@/assets';
import { Link } from 'react-router-dom';

// Stable AnimatedSection component (moved out of TestPage to avoid remounts)
const AnimatedSection: React.FC<{ children: any; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  // use whileInView with viewport.once to prevent repeated in/out animations
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Navigation
  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  // Stats
  const stats = [
    { value: '50K+', label: 'Active Students', icon: Users },
    { value: '1M+', label: 'Study Hours', icon: Clock },
    { value: '98%', label: 'Success Rate', icon: TrendingUp },
    { value: '4.9/5', label: 'User Rating', icon: Star },
  ];

  // Features
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Notes',
      description:
        'Upload your materials or enter a topic, and watch AI generate comprehensive, structured notes in seconds.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      benefits: ['Instant generation', 'Well-structured', 'Key concepts highlighted'],
    },
    {
      icon: Sparkles,
      title: 'Smart Flashcards',
      description:
        'Auto-generate flashcards from your notes with spaced repetition algorithms for optimal retention.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      benefits: ['Spaced repetition', 'Auto-generated', 'Mastery tracking'],
    },
    {
      icon: FileText,
      title: 'Interactive Quizzes',
      description:
        'Test your knowledge with AI-generated quizzes tailored to your study materials.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      benefits: ['Multiple formats', 'Instant feedback', 'Performance analytics'],
    },
    {
      icon: Video,
      title: 'Video Explainers',
      description:
        'Get engaging video scripts that break down complex topics into digestible content.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      benefits: ['Visual learning', 'Step-by-step', 'Engaging format'],
    },
    {
      icon: Target,
      title: 'Study Boards',
      description:
        'Organize everything in one place. Each topic gets its own board with notes, cards, and quizzes.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      benefits: ['Organized learning', 'Progress tracking', 'All-in-one hub'],
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description:
        'Track your learning journey with detailed insights and AI-powered recommendations.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      benefits: ['Visual insights', 'AI recommendations', 'Goal tracking'],
    },
  ];

  // How it works
  const steps = [
    {
      number: '01',
      title: 'Upload or Enter Topic',
      description: 'Drop your PDFs, documents, or simply type what you want to learn.',
      icon: FileUp,
      color: 'purple',
    },
    {
      number: '02',
      title: 'AI Processes Content',
      description: 'Our AI analyzes and structures the material into digestible segments.',
      icon: Brain,
      color: 'blue',
    },
    {
      number: '03',
      title: 'Get Study Materials',
      description: 'Receive notes, flashcards, quizzes, and more - all in one study board.',
      icon: BookOpen,
      color: 'green',
    },
    {
      number: '04',
      title: 'Learn & Master',
      description: 'Study at your pace, track progress, and ace your exams.',
      icon: Award,
      color: 'orange',
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Medical Student',
      image: '👩‍⚕️',
      content:
        'StudyRok transformed how I study for med school. The AI-generated notes save me hours, and the flashcards with spaced repetition helped me ace my anatomy exam!',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Computer Science Major',
      image: '👨‍💻',
      content:
        'As a CS student, I have tons of lecture slides. StudyRok turns them into organized study materials instantly. The quiz feature is perfect for exam prep.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'High School Senior',
      image: '👩‍🎓',
      content:
        "I'm preparing for college entrance exams, and StudyRok makes it so much easier. The study boards keep everything organized, and I love the progress tracking!",
      rating: 5,
    },
    {
      name: 'David Park',
      role: 'Graduate Student',
      image: '👨‍🔬',
      content:
        'The AI video explainer scripts are genius! I can finally understand complex research papers. This tool is a game-changer for grad school.',
      rating: 5,
    },
  ];

  // Pricing
  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out StudyRok',
      features: [
        '5 study boards per month',
        'Basic AI notes generation',
        '50 flashcards',
        '10 quizzes',
        'Community support',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      description: 'Best for serious students',
      features: [
        '50 study boards per month',
        'Advanced AI (Gemini Pro)',
        '500 flashcards',
        '100 quizzes',
        'Video explainer scripts',
        'Priority support',
        'Progress analytics',
      ],
      cta: 'Start Premium',
      popular: true,
    },
    {
      name: 'Pro',
      price: '$19.99',
      period: 'per month',
      description: 'Unlimited learning potential',
      features: [
        'Unlimited study boards',
        'Premium AI (GPT-4)',
        'Unlimited flashcards & quizzes',
        'Full video generation',
        'Advanced analytics',
        'Custom AI models',
        '24/7 priority support',
        'Early access to features',
      ],
      cta: 'Go Pro',
      popular: false,
    },
  ];
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
    viewport: { once: true, amount: 0.2 },
  });

  const AnimatedSection = ({ children, delay = 0 }: any): any => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={isInView ? { duration: 0 } : { duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              {/* <img src={logo} alt="Logo" className="h-10 w-auto " /> */}
              <span className="text-2xl font-bold text-gray-900">StudyRok</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                <Link to="/welcome">Get Started</Link>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-black" />
              ) : (
                <Menu className="w-6 h-6 text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 hover:text-purple-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div style={{ opacity, scale }} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full text-purple-600 font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Study Revolution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Study Smarter,
              <br />
              Stay Consistent
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
            >
              Transform any topic or document into comprehensive study materials with AI. Notes,
              flashcards, quizzes, and more - all in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="group px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-purple-600 transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image/Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 text-center text-sm text-gray-600 font-medium">
                  studyrok.com
                </div>
              </div>
              <div className="p-8 bg-white">
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded-lg w-2/3 animate-pulse"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-32 bg-purple-100 rounded-xl"></div>
                    <div className="h-32 bg-blue-100 rounded-xl"></div>
                    <div className="h-32 bg-green-100 rounded-xl"></div>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-sm text-gray-600">AI Generated!</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-sm text-gray-600">3 min saved</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div {...fadeUp(0)}>
                <div className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to Ace Your Exams
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                One platform, unlimited learning possibilities. From notes to quizzes, we've got you
                covered.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div {...fadeUp(index * 0.1)}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-200 hover:shadow-xl transition-all cursor-pointer h-full"
                >
                  <div
                    className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Your Journey to Better Grades
              </h2>
              <p className="text-xl text-gray-600">Four simple steps to transform how you study</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div {...fadeUp(index * 0.15)}>
                <div className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -z-10">
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className={`h-full bg-${step.color}-500`}
                      />
                    </div>
                  )}
                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-purple-300 transition-all">
                    <div className="text-6xl font-bold text-gray-100 mb-4">{step.number}</div>
                    <div
                      className={`w-12 h-12 bg-${step.color}-100 rounded-xl flex items-center justify-center mb-4`}
                    >
                      <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section id="testimonials" className="py-20 px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Loved by Students Worldwide
              </h2>
              <p className="text-xl text-gray-600">Join students who are studying smarter</p>
            </div>
          </motion.div>

          <div className="relative overflow-hidden">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl max-w-4xl mx-auto"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="text-6xl">{testimonials[activeTestimonial].image}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 mb-6 italic">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-purple-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose Your Learning Plan
              </h2>
              <p className="text-xl text-gray-600">Start free, upgrade anytime. No hidden fees.</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div {...fadeUp(index * 0.1)}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`relative bg-white rounded-2xl p-8 border-2 transition-all ${
                    plan.popular
                      ? 'border-purple-600 shadow-2xl'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/ {plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      plan.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-gray-600">
                All plans include 14-day money-back guarantee.
                <a href="#" className="text-purple-600 font-semibold hover:underline ml-1">
                  View full comparison
                </a>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-600 -z-10"></div>
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-6"
            >
              <Rocket className="w-16 h-16 text-gray-900" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Study Game?
            </h2>
            <p className="text-xl text-purple-500 mb-10">
              Join students who are already studying smarter with StudyRok
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center gap-2">
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button className="px-8 py-4 bg-purple-700 text-white rounded-xl font-bold text-lg border-2 border-purple-400 hover:bg-purple-800 transition-all">
                Talk to Sales
              </button> */}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={LOGO} alt="Logo" className="h-10 w-auto" />
                <span className="text-2xl font-bold">StudyRok</span>
              </div>
              <p className="text-gray-400 mb-6">Study companion for better grades.</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  in
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    GDPR
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 StudyRok. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Status
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
