"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Rusheel Pothani",
    country: "USA",
    course: "State University of New York",
    rating: 5,
    text: "Sharada Associates made my education loan process simple and stress-free. Their team guided me from admission to loan approval and supported me at every step.",
    initial: "R",
    avatarColor: "#2563EB",
  },
  {
    name: "Praneetha",
    country: "USA",
    course: "Christian Brothers University",
    rating: 5,
    text: "I had a wonderful experience with Sharada Associates. Their professional guidance helped me secure funding quickly and fulfill my dream of studying abroad.",
    initial: "P",
    avatarColor: "#D4A017",
  },
  {
    name: "Sidharth",
    country: "USA",
    course: "New Jersey Institute of Technology",
    rating: 5,
    text: "The entire process was smooth and transparent. I received timely updates and excellent support throughout my journey.",
    initial: "S",
    avatarColor: "#10B981",
  },
  {
    name: "Rasagnya Gopishetty",
    country: "USA",
    course: "Clark University",
    rating: 5,
    text: "Thank you to the Sharada Associates team for helping me with admissions and financial planning. Their expertise made everything easier.",
    initial: "R",
    avatarColor: "#F59E0B",
  },
  {
    name: "Rahul Sai Charipally",
    country: "USA",
    course: "University of Illinois Springfield",
    rating: 5,
    text: "Highly professional and student-friendly service. I would definitely recommend Sharada Associates to students planning higher education overseas.",
    initial: "R",
    avatarColor: "#8B5CF6",
  },
  {
    name: "Haridarshan Kiran Kumar",
    country: "UK",
    course: "Aston University",
    rating: 5,
    text: "From documentation to loan disbursement, everything was handled efficiently. Their support gave me confidence throughout the process.",
    initial: "H",
    avatarColor: "#2563EB",
  },
  {
    name: "Sai Ram Gogineni",
    country: "USA",
    course: "Concordia University St. Paul",
    rating: 5,
    text: "I appreciate the dedication and commitment shown by the team. They answered all my questions patiently and guided me properly.",
    initial: "S",
    avatarColor: "#D4A017",
  },
  {
    name: "Gurjyot Kaur",
    country: "UK",
    course: "University of East London",
    rating: 5,
    text: "Sharada Associates helped me secure my education loan without unnecessary complications. Their experience and support were truly valuable.",
    initial: "G",
    avatarColor: "#10B981",
  },
  {
    name: "Ashish Alam",
    country: "USA",
    course: "University of North Texas",
    rating: 5,
    text: "The team provided excellent assistance during my admission and loan process. I am grateful for their timely support.",
    initial: "A",
    avatarColor: "#F59E0B",
  },
  {
    name: "Kattele Nithya Sri",
    country: "USA",
    course: "New Jersey Institute of Technology",
    rating: 5,
    text: "My experience with Sharada Associates was outstanding. They made studying abroad financially possible for me.",
    initial: "K",
    avatarColor: "#8B5CF6",
  },
  {
    name: "Vijay Kumar Ranadigu",
    country: "USA",
    course: "University of New Haven",
    rating: 5,
    text: "I received complete guidance from start to finish. Their service was professional, transparent, and reliable.",
    initial: "V",
    avatarColor: "#2563EB",
  },
  {
    name: "Shashi Preetham Alukapally",
    country: "USA",
    course: "University of Bridgeport",
    rating: 5,
    text: "The entire process was handled with great care and professionalism. I am thankful for their support.",
    initial: "S",
    avatarColor: "#D4A017",
  },
  {
    name: "Dineshraj Pampati",
    country: "USA",
    course: "University of Dayton",
    rating: 5,
    text: "Sharada Associates helped me achieve my dream of pursuing higher education abroad. Their quick response and guidance were impressive.",
    initial: "D",
    avatarColor: "#10B981",
  },
  {
    name: "Sameer Pur Qurbani",
    country: "UK",
    course: "University of Roehampton, London",
    rating: 5,
    text: "Excellent service and smooth documentation process. I had a great experience working with their team.",
    initial: "S",
    avatarColor: "#F59E0B",
  },
  {
    name: "Voriganti Malavika",
    country: "USA",
    course: "Clark University",
    rating: 5,
    text: "They provided personalized support and ensured that every step was completed correctly. Highly recommended.",
    initial: "V",
    avatarColor: "#8B5CF6",
  },
  {
    name: "Keshireddy Pranay",
    country: "USA",
    course: "Governors State University",
    rating: 5,
    text: "I am thankful to Sharada Associates for making my admission and loan process hassle-free. Their guidance was extremely helpful.",
    initial: "K",
    avatarColor: "#2563EB",
  },
  {
    name: "Anna Joyce",
    country: "USA",
    course: "University of Memphis",
    rating: 5,
    text: "The staff was supportive and approachable throughout the process. Their experience made everything easier.",
    initial: "A",
    avatarColor: "#D4A017",
  },
  {
    name: "Mohammad Nadeem Ali",
    country: "USA",
    course: "University of South Florida",
    rating: 5,
    text: "Sharada Associates gave me complete confidence during my study abroad journey. I truly appreciate their dedication.",
    initial: "M",
    avatarColor: "#10B981",
  },
  {
    name: "Sainath Reddy",
    country: "USA",
    course: "State University of New York at Buffalo",
    rating: 5,
    text: "The team handled everything professionally and ensured a smooth experience. I am happy with their services.",
    initial: "S",
    avatarColor: "#F59E0B",
  },
  {
    name: "Sai Kiran Reddy",
    country: "USA",
    course: "State University of New York at Buffalo",
    rating: 5,
    text: "Excellent consultancy with genuine guidance. Their support helped me secure funding successfully.",
    initial: "S",
    avatarColor: "#8B5CF6",
  },
  {
    name: "Yellamula Yugender Reddy",
    country: "USA",
    course: "Southern Illinois University Edwardsville",
    rating: 5,
    text: "Thanks to Sharada Associates, I was able to pursue my higher education goals. Their assistance was exceptional.",
    initial: "Y",
    avatarColor: "#2563EB",
  },
  {
    name: "Ari Rohini",
    country: "USA",
    course: "Rowan University",
    rating: 5,
    text: "I had a great experience working with the team. They provided clear guidance and fast processing.",
    initial: "A",
    avatarColor: "#D4A017",
  },
  {
    name: "Chinna Sivaiah",
    country: "USA",
    course: "University of Colorado Boulder",
    rating: 5,
    text: "Their commitment and professionalism exceeded my expectations. I would strongly recommend Sharada Associates.",
    initial: "C",
    avatarColor: "#10B981",
  },
  {
    name: "Sai Charan Pillarisetty",
    country: "USA",
    course: "University of Dayton",
    rating: 5,
    text: "Very responsive team and excellent customer service. They made the entire process smooth and stress-free.",
    initial: "S",
    avatarColor: "#F59E0B",
  },
  {
    name: "Prithviraj Singh Thakur",
    country: "USA",
    course: "University of Denver",
    rating: 5,
    text: "Sharada Associates supported me throughout my journey and ensured timely completion of every requirement.",
    initial: "P",
    avatarColor: "#8B5CF6",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(3);
  const total = reviews.length;

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = total - perView;
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));
  const next = () => setCurrent((c) => Math.min(c + 1, maxIndex));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="section-padding bg-section-alt overflow-hidden">
      <div className="container-max">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="badge-pill mb-5 inline-flex">Testimonials</span>
          <h2 className="section-title mx-auto">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto text-center">
            Real stories from real students and customers who trusted us.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${current * (100 / perView)}% - ${current * 20 / perView}px))`,
              }}
            >
              {reviews.map((review, i) => (
                <div
                  key={review.name}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / perView}% - ${(perView - 1) * 20 / perView}px)` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="premium-card h-full relative"
                    style={{ background: "var(--bg-primary)" }}
                  >
                    {/* Quote icon */}
                    <Quote
                      className="absolute top-5 right-5 w-8 h-8 opacity-10"
                      style={{ color: "var(--text-primary)" }}
                    />

                    <Stars count={review.rating} />

                    <p
                      className="mt-4 text-sm leading-relaxed mb-6"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Divider */}
                    <div className="divider mb-5" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm"
                        style={{ background: review.avatarColor }}
                      >
                        {review.initial}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                          {review.name}
                        </p>
                        <div className="text-xs flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
                          {review.country === 'USA' && <img src="https://flagcdn.com/w20/us.png" alt="USA" className="w-4 h-auto inline-block" />}
                          {review.country === 'UK' && <img src="https://flagcdn.com/w20/gb.png" alt="UK" className="w-4 h-auto inline-block" />}
                          <span>{review.country} · {review.course}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-110"
              style={{
                background: "var(--bg-primary)",
                border: "1.5px solid var(--border)",
                color: "var(--text-primary)",
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: current === i ? "24px" : "8px",
                    height: "8px",
                    background: current === i ? "var(--gold)" : "var(--border)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={current >= maxIndex}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:scale-110"
              style={{
                background: "var(--bg-primary)",
                border: "1.5px solid var(--border)",
                color: "var(--text-primary)",
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
