/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import {
  BarChart3,
  BellRing,
  Bot,
  LineChart,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [isVisible, setIsVisible] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Real-time Market Data",
      description:
        "Access live stock prices, charts, and market indicators to make informed decisions.",
    },
    {
      icon: <Bot className="h-10 w-10 text-accent" />,
      title: "AI-Powered Analysis",
      description:
        "Get personalized stock recommendations and insights powered by advanced AI algorithms.",
    },
    {
      icon: <BellRing className="h-10 w-10 text-secondary" />,
      title: "Custom Watchlists",
      description:
        "Create and manage personalized watchlists to track your favorite stocks.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Technical Indicators",
      description:
        "Analyze stocks using popular technical indicators and chart patterns.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Day Trader",
      content:
        "StockGenius has completely transformed my trading strategy. The AI insights have helped me identify opportunities I would have otherwise missed.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Long-term Investor",
      content:
        "As someone who invests for the long term, the analysis provided by StockGenius gives me confidence in my investment decisions.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Jessica Williams",
      role: "Financial Advisor",
      content:
        "I recommend StockGenius to all my clients. The intuitive interface and powerful tools make it accessible for investors of all experience levels.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const faqs = [
    {
      question: "How does StockGenius generate stock recommendations?",
      answer:
        "StockGenius uses a combination of machine learning algorithms, technical analysis, and fundamental data to generate personalized stock recommendations. Our AI analyzes market trends, company financials, and news sentiment to provide insights tailored to your investment goals.",
    },
    {
      question: "Is StockGenius suitable for beginners?",
      answer:
        "StockGenius is designed to be user-friendly for investors of all experience levels. Beginners can benefit from our educational resources and simplified analysis, while experienced traders can dive deeper into advanced technical indicators and custom strategies.",
    },
    {
      question: "How accurate are the AI predictions?",
      answer:
        "While no prediction system is perfect, StockGenius has demonstrated strong performance in identifying market trends and opportunities. Our AI models are continuously trained on the latest market data and refined to improve accuracy over time. We recommend using our insights as one of several tools in your investment decision process.",
    },
    {
      question: "Can I connect my brokerage account?",
      answer:
        "Currently, StockGenius operates as an analysis and research platform without direct brokerage integration. However, we're working on partnerships with major brokerages to enable seamless trading in future updates.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary via-secondary to-accent opacity-30"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center mix-blend-overlay"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Intelligent Stock Analysis</span>
              <br />
              Powered by AI
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10">
              Make smarter investment decisions with real-time data, AI-driven insights,
              and powerful analytics tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={token ? "/dashboard" : "/auth"}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-accent-fg"
                >
                  {token ? "Go to Dashboard" : "Get Started"}{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-accent-fg"
                >
                  {token ? "View Profile" : "Learn More"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to analyze the market and make informed investment
              decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-xl card-hover"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              StockGenius simplifies the process of stock analysis and investment
              decision-making.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card p-6 rounded-xl h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Account</h3>
                <p className="text-gray-400">
                  Sign up for StockGenius and set up your investment preferences and risk
                  tolerance.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card p-6 rounded-xl h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 text-secondary mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore Stocks</h3>
                <p className="text-gray-400">
                  Browse our extensive database of stocks, create watchlists, and track
                  your favorite companies.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-secondary" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-card p-6 rounded-xl h-full">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get AI Insights</h3>
                <p className="text-gray-400">
                  Receive personalized recommendations and in-depth analysis to make
                  informed investment decisions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of investors who trust StockGenius for their investment
              decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about StockGenius.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex justify-between items-center p-4 rounded-lg text-left ${
                    activeAccordion === index
                      ? "bg-card"
                      : "bg-background hover:bg-card/50"
                  }`}
                >
                  <span className="font-semibold">{faq.question}</span>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {activeAccordion === index && (
                  <div className="p-4 bg-card/50 rounded-b-lg mt-1">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Investment Strategy?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join StockGenius today and gain access to powerful tools and insights that
              will help you make better investment decisions.
            </p>

            <Link to={token ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-accent-fg">
                {token ? "Go to Dashboard" : "Get Started Now"}{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-primary">StockGenius</h3>
              <p className="text-gray-400 mt-2">Intelligent Stock Analysis</p>
            </div>

            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      API
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} StockGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
