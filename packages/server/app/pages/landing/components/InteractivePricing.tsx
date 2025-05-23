import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function InteractivePricing() {
  const [isYearly, setIsYearly] = React.useState(false);

  // Pricing plans
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 49,
      yearlyPrice: 39, // per month, billed yearly
      features: [
        "Up to 10,000 monthly active users",
        "Basic AI content moderation",
        "Standard support",
        "1 project",
        "Community access",
      ],
      popular: false,
      gradient: "from-blue-400 to-indigo-400",
      delay: 0.1,
    },
    {
      name: "Pro",
      description: "For growing teams and applications",
      monthlyPrice: 99,
      yearlyPrice: 79, // per month, billed yearly
      features: [
        "Up to 50,000 monthly active users",
        "Advanced AI content curation",
        "Priority support",
        "5 projects",
        "Analytics dashboard",
        "Custom branding",
      ],
      popular: true,
      gradient: "from-indigo-400 via-purple-400 to-blue-400",
      delay: 0.2,
    },
    {
      name: "Enterprise",
      description: "For large-scale applications",
      monthlyPrice: 249,
      yearlyPrice: 199, // per month, billed yearly
      features: [
        "Unlimited monthly active users",
        "Full AI feature suite",
        "24/7 dedicated support",
        "Unlimited projects",
        "Advanced analytics",
        "Custom integrations",
        "SLA guarantees",
      ],
      popular: false,
      gradient: "from-purple-400 to-blue-400",
      delay: 0.3,
    },
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 py-24">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Simple, Transparent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Pricing
            </span>
          </h2>
          <p className="text-zinc-400">
            Choose the plan that fits your needs. All plans include core
            features with different usage limits.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center">
          <span
            className={`mr-3 text-sm ${!isYearly ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
          >
            Monthly
          </span>
          <motion.button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full ${isYearly ? "bg-indigo-500" : "bg-zinc-700"}`}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Toggle yearly billing</span>
            <motion.span
              className="inline-block h-4 w-4 rounded-full bg-zinc-100"
              animate={{ x: isYearly ? 26 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
          <span
            className={`ml-3 text-sm ${isYearly ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
          >
            Yearly{" "}
            <span className="ml-1 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            className={`relative overflow-hidden rounded-2xl border ${
              plan.popular ? "border-zinc-700" : "border-zinc-800/50"
            } bg-zinc-900/50 backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: plan.delay }}
            whileHover={{
              y: -5,
              boxShadow: "0 8px 20px -6px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -right-12 top-6 w-40 rotate-45 bg-gradient-to-r from-blue-400 to-indigo-400 py-1 text-center text-xs font-medium text-white shadow-md">
                Most Popular
              </div>
            )}

            {/* Plan header */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-400">{plan.description}</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-zinc-100">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="ml-1 text-sm text-zinc-400">/month</span>
              </div>
              {isYearly && (
                <p className="mt-1 text-sm text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}">
                  Billed annually (${plan.yearlyPrice * 12})
                </p>
              )}
            </div>

            {/* Feature list */}
            <div className="border-t border-zinc-800/50 p-6">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: plan.delay + 0.1 + i * 0.1,
                    }}
                  >
                    <div
                      className={`mr-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800`}
                    >
                      <Check
                        className={`h-3 w-3 text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}
                      />
                    </div>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="border-t border-zinc-800/50 p-6">
              <motion.button
                className={`w-full rounded-lg py-2.5 text-sm font-medium ${
                  plan.popular
                    ? "bg-zinc-800 border border-zinc-700/50"
                    : "bg-zinc-800 border border-zinc-800/50 hover:border-zinc-700/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}
                >
                  {plan.popular ? "Get started" : "Choose plan"}
                </span>
              </motion.button>
            </div>

            {/* Decorative gradient at bottom */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${plan.gradient} opacity-50`}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* Enterprise CTA */}
      <motion.div
        className="mt-16 rounded-2xl bg-zinc-900/50 p-8 text-center backdrop-blur-sm border border-zinc-800/50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-zinc-100 mb-2">
          Need a custom solution?
        </h3>
        <p className="mx-auto max-w-2xl text-zinc-400 mb-6">
          Contact our sales team for custom pricing and enterprise features
          tailored to your specific requirements.
        </p>
        <motion.button
          className="inline-flex items-center rounded-lg bg-zinc-800 border border-zinc-700/50 px-6 py-3 text-sm font-medium hover:border-zinc-600/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Contact Sales
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
