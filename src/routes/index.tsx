import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/hero.jpg";
import craftImg from "@/assets/craft.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asta Developer — مطوّر ويب ومنتجات رقمية" },
      {
        name: "description",
        content:
          "أستا ديفلوبر: مطوّر يبني مواقع وتطبيقات سريعة وأنيقة من الفكرة للإطلاق. شوف الشغل واحجز مكالمة.",
      },
      { property: "og:title", content: "Asta Developer — مطوّر ويب ومنتجات رقمية" },
      {
        property: "og:description",
        content: "مواقع وتطبيقات سريعة وأنيقة، من الفكرة للإطلاق. احجز مكالمة قصيرة.",
      },
    ],
  }),
  component: Index,
});

const bands = [
  {
    kicker: "01 — The Idea",
    title: "الفكرة بتبدأ في الضلمة",
    body: "سطر كود واحد، وانت لسه شايف الفكرة في دماغك بس.",
  },
  {
    kicker: "02 — The Build",
    title: "البناء بيحصل بهدوء",
    body: "كود نضيف، سرعة عالية، وتفاصيل محدش بياخد باله منها غير لما تختفي.",
  },
  {
    kicker: "03 — The Launch",
    title: "وبعدين بينوّر",
    body: "منتج شغال على الهاتف والكمبيوتر، جاهز لعملائك من اليوم الأول.",
  },
];

const marqueeWords = [
  "REACT",
  "TYPESCRIPT",
  "NODE",
  "SUPABASE",
  "TAILWIND",
  "NEXT",
  "POSTGRES",
  "MOTION",
];

const services = [
  {
    label: "Web Apps",
    title: "تطبيقات ويب",
    body: "لوحات تحكم، حسابات مستخدمين، ودوال سيرفر. React وTypeScript وقواعد بيانات.",
  },
  {
    label: "Landing Pages",
    title: "صفحات هبوط",
    body: "صفحة واحدة بتشرح المنتج وتقنع الزائر يتحرك. سريعة ومهيّأة لمحركات البحث.",
  },
  {
    label: "Automation",
    title: "أتمتة وتكاملات",
    body: "ربط الأنظمة ببعضها: مدفوعات، إيميلات، وAPIs، من غير شغل يدوي متكرر.",
  },
  {
    label: "Rescue",
    title: "إنقاذ مشروع",
    body: "مشروع واقف أو بطيء؟ بشوف المشكلة، بصلّحها، وبسلّم كود مفهوم.",
  },
];

const projects = [
  {
    img: p1,
    name: "Nawah Dashboard",
    kind: "لوحة تحليلات",
    result: "تقارير لحظية بدل تقارير أسبوعية يدوية.",
    metric: "٤× أسرع في اتخاذ القرار",
  },
  {
    img: p2,
    name: "Nocturne Store",
    kind: "متجر إلكتروني",
    result: "تحميل أقل من ثانية، وسلة شراء بتشتغل صح على الموبايل.",
    metric: "+٣٧٪ مبيعات",
  },
  {
    img: p3,
    name: "Rakiza Booking",
    kind: "نظام حجوزات",
    result: "حجز في ٣ خطوات، وتذكير أوتوماتيك للعملاء.",
    metric: "−٦٠٪ مواعيد ضايعة",
  },
];

const steps = [
  { n: "01", t: "مكالمة", d: "ربع ساعة نفهم فيها المشكلة والهدف." },
  { n: "02", t: "خطة", d: "نطاق واضح، سعر ثابت، وتاريخ تسليم." },
  { n: "03", t: "بناء", d: "رابط مباشر تجرّب عليه كل أسبوع." },
  { n: "04", t: "إطلاق", d: "نشر، قياس سرعة، وتسليم الكود ليك." },
];

const faqs = [
  {
    q: "المشروع بياخد قد إيه؟",
    a: "صفحة هبوط من أسبوع لأسبوعين. تطبيق ويب كامل من أربع لثمان أسابيع، حسب حجمه.",
  },
  {
    q: "بتشتغل مع ناس لسه في أول الطريق؟",
    a: "أيوه. لو الفكرة لسه في الورق، بنبدأ بنسخة أولى صغيرة نختبرها بسرعة.",
  },
  { q: "الكود بيبقى ليا؟", a: "الكود كله ليك، على حسابك، ومكتوب بشكل يقدر أي مطوّر يكمّله." },
  { q: "بتتواصل إزاي؟", a: "تحديث أسبوعي مكتوب، ورابط مباشر تجرّب عليه الشغل وهو بيتبني." },
];

function Index() {
  const [progress, setProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        setPageProgress(max > 0 ? window.scrollY / max : 0);
        const el = heroRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <div dir="rtl" className="grain relative bg-background">
      <div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-right bg-gradient-to-l from-primary to-accent"
        style={{ transform: `scaleX(${pageProgress})` }}
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <span className="font-display text-sm font-bold tracking-[0.28em]">
            ASTA<span className="text-primary">.</span>DEV
          </span>
          <a
            href="#booking"
            className="group relative overflow-hidden rounded-full border border-primary/40 px-5 py-2 text-xs font-semibold text-primary backdrop-blur-md transition hover:text-primary-foreground"
          >
            <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative">احجز مكالمة</span>
          </a>
        </div>
      </header>

      {/* Cinematic scroll hero */}
      <section ref={heroRef} className="relative h-[420vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            src={heroImg}
            alt="مطوّر يعمل أمام جدار من الكود المضيء"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
            style={{
              transform: `scale(${1.28 - progress * 0.26}) translateY(${progress * -6}%)`,
              filter: `brightness(${0.45 + progress * 0.6}) saturate(${0.7 + progress * 0.7}) contrast(${1 + progress * 0.15})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_5%,oklch(0.1_0.01_60/0.9)_78%)]" />
          <div
            className="absolute inset-0 bg-background transition-none"
            style={{ opacity: Math.max(0, 0.55 - progress * 0.8) }}
          />

          {/* Title */}
          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="label-mono mb-5" style={{ opacity: 1 - Math.min(1, progress * 3) }}>
              Asta Developer · Cairo
            </p>
            <h1
              className="text-glow max-w-4xl text-5xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl"
              style={{
                opacity: 1 - Math.min(1, progress * 2.6),
                transform: `translateY(${progress * -60}px) scale(${1 - progress * 0.05})`,
                letterSpacing: `${-0.02 - progress * 0.01}em`,
              }}
            >
              بابني مواقع وتطبيقات
              <span className="mt-2 block text-gradient">تشتغل وتبيع</span>
            </h1>

            {/* Bands crossfade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-28 px-6">
              <div className="relative mx-auto h-40 max-w-2xl">
                {bands.map((b, i) => {
                  const start = 0.14 + i * 0.28;
                  const d = Math.abs(progress - (start + 0.11));
                  const o = Math.max(0, 1 - d / 0.14);
                  return (
                    <div
                      key={b.kicker}
                      className="absolute inset-0"
                      style={{
                        opacity: o,
                        transform: `translateY(${(1 - o) * 24}px)`,
                      }}
                    >
                      <p className="label-mono mb-3 text-primary">{b.kicker}</p>
                      <h2 className="text-glow text-3xl font-bold sm:text-5xl">{b.title}</h2>
                      <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
                        {b.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ending CTA */}
            <div
              className="pointer-events-auto absolute inset-x-0 bottom-28 flex justify-center px-6"
              style={{
                opacity: Math.max(0, (progress - 0.86) / 0.12),
                pointerEvents: progress > 0.9 ? "auto" : "none",
              }}
            >
              <a
                href="#booking"
                className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-[var(--glow-primary)]"
              >
                ابدأ مشروعك
              </a>
            </div>

            <div
              className="absolute bottom-8 flex flex-col items-center gap-2"
              style={{ opacity: 1 - Math.min(1, progress * 5) }}
            >
              <span className="label-mono">Scroll</span>
              <span className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border py-5">
        <div className="marquee-track gap-10">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="font-mono text-xs tracking-[0.35em] text-muted-foreground"
            >
              {w} <span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="reveal grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="label-mono mb-5">About</p>
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              أنا أستا، مطوّر
              <span className="text-gradient"> بيحب التفاصيل</span>
            </h2>
            <p className="mt-6 leading-9 text-muted-foreground">
              بشتغل مع أصحاب المشاريع من أول الفكرة لحد ما المنتج يبقى على الإنترنت. مش بسلّم ملفات
              وأمشي، بسلّم حاجة شغالة وسريعة وسهل تطويرها بعدين.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { n: "٦+", l: "سنوات خبرة" },
                { n: "٤٠+", l: "مشروع" },
                { n: "٩٨٪", l: "رجعوا تاني" },
              ].map((s) => (
                <div key={s.l} className="surface rounded-2xl px-3 py-5 text-center">
                  <p className="font-display text-3xl font-bold text-primary">{s.n}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
            <img
              src={craftImg}
              alt="أيادي تكتب على كيبورد ميكانيكي في إضاءة خافتة"
              width={1280}
              height={912}
              loading="lazy"
              className="relative rounded-3xl border border-border object-cover shadow-[var(--shadow-lift)]"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="label-mono mb-5">Services</p>
        <h2 className="mb-12 text-4xl font-bold sm:text-5xl">اللي بقدمه</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <article
              key={s.label}
              className="reveal surface group relative overflow-hidden rounded-3xl p-8 transition duration-500 hover:-translate-y-1 hover:border-primary/50"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
              <p className="label-mono text-accent">{s.label}</p>
              <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="label-mono mb-5">Selected Work</p>
        <h2 className="mb-12 text-4xl font-bold sm:text-5xl">شغل اتسلّم واشتغل</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.name} className="reveal group">
              <div className="overflow-hidden rounded-3xl border border-border">
                <img
                  src={p.img}
                  alt={p.name}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-80 w-full object-cover transition duration-[900ms] group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <p className="label-mono text-accent">{p.kind}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.result}</p>
                <p className="mt-3 inline-block rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">
                  {p.metric}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <p className="label-mono mb-5">Process</p>
        <h2 className="mb-12 text-4xl font-bold sm:text-5xl">إزاي بنشتغل</h2>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="reveal bg-card p-7">
              <p className="font-mono text-xs text-primary">{s.n}</p>
              <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <p className="label-mono mb-5">FAQ</p>
        <h2 className="mb-10 text-4xl font-bold sm:text-5xl">أسئلة بتتكرر</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="reveal surface rounded-2xl p-6">
              <summary className="cursor-pointer list-none text-lg font-semibold marker:hidden">
                <span className="text-primary">+ </span>
                {f.q}
              </summary>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="relative mx-auto max-w-3xl px-5 pb-32 pt-10">
        <div className="reveal surface relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-14">
          <div className="pointer-events-none absolute -top-24 right-1/2 h-64 w-64 translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <p className="label-mono mb-5">Book a call</p>
            <h2 className="text-4xl font-bold sm:text-5xl">نتكلم ١٥ دقيقة؟</h2>
            <p className="mx-auto mt-5 max-w-md leading-8 text-muted-foreground">
              احكيلي عن مشروعك وهقولك رأيي بصراحة: يستاهل يتبني إزاي، وياخد قد إيه.
            </p>
            <BookingForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-xs text-muted-foreground">
        <p>Asta Developer © {new Date().getFullYear()} — بيتبني بحب في القاهرة</p>
      </footer>
    </div>
  );
}

function BookingForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-8 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-8 text-sm text-primary">
        وصلني طلبك. هرد عليك خلال ٢٤ ساعة على نفس الإيميل.
      </p>
    );
  }

  return (
    <form
      className="mt-9 space-y-3 text-right"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        required
        name="name"
        placeholder="اسمك"
        className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-sm outline-none transition focus:border-primary"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="الإيميل"
        className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-sm outline-none transition focus:border-primary"
      />
      <textarea
        required
        name="brief"
        rows={4}
        placeholder="المشروع عن إيه؟"
        className="w-full rounded-2xl border border-input bg-background px-5 py-4 text-sm outline-none transition focus:border-primary"
      />
      <button
        type="submit"
        className="w-full rounded-2xl bg-primary px-5 py-4 font-bold text-primary-foreground shadow-[var(--glow-primary)] transition hover:opacity-90"
      >
        ابعت الطلب
      </button>
    </form>
  );
}
