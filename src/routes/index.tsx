import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroImg from "@/assets/hero.jpg";
import craftImg from "@/assets/craft.jpg";
import workImg from "@/assets/work.jpg";

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
    body: "أول سطر كود بيتكتب وانت لسه شايف الفكرة في دماغك بس. شغلي إني أخليها حاجة الناس تلمسها.",
  },
  {
    kicker: "02 — The Build",
    title: "البناء بيحصل بهدوء",
    body: "كود نضيف، سرعة عالية، وتفاصيل صغيرة محدش بياخد باله منها غير لما تختفي.",
  },
  {
    kicker: "03 — The Launch",
    title: "وبعدين بينوّر",
    body: "منتج شغال على الهاتف والكمبيوتر، جاهز للعملاء من اليوم الأول.",
  },
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
    body: "صفحة واحدة بتشرح المنتج وتقنع الزائر يتحرك. سريعة، ومهيّأة لمحركات البحث.",
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
    name: "Nawah Dashboard",
    kind: "لوحة تحليلات",
    result: "تقارير لحظية بدل تقارير أسبوعية يدوية.",
  },
  {
    name: "Sila Store",
    kind: "متجر إلكتروني",
    result: "زمن تحميل أقل من ثانية، ومبيعات أونلاين شغالة.",
  },
  {
    name: "Rakiza Booking",
    kind: "نظام حجوزات",
    result: "حجز في ٣ خطوات، وتذكير أوتوماتيك للعملاء.",
  },
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
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
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
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  const bandIndex = Math.min(bands.length - 1, Math.floor(progress * bands.length * 1.02));
  const band = bands[bandIndex] ?? bands[0]!;

  return (
    <div dir="rtl" className="bg-background">
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="font-display text-sm font-bold tracking-[0.2em] text-foreground">
            ASTA<span className="text-primary">.</span>DEV
          </span>
          <a
            href="#booking"
            className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            احجز مكالمة
          </a>
        </div>
      </header>

      {/* Cinematic scroll hero */}
      <section ref={heroRef} className="relative h-[320vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            src={heroImg}
            alt="مطوّر يعمل أمام جدار من الكود المضيء"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: `scale(${1.18 - progress * 0.16}) translateY(${progress * -4}%)`,
              filter: `brightness(${0.55 + progress * 0.45}) saturate(${0.8 + progress * 0.5})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,oklch(0.12_0.01_60/0.85)_75%)]" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
            <p
              className="label-mono mb-4"
              style={{ opacity: 1 - Math.min(1, progress * 3) }}
            >
              Asta Developer
            </p>
            <h1
              className="text-glow max-w-3xl text-4xl font-bold leading-tight sm:text-6xl"
              style={{
                opacity: 1 - Math.min(1, progress * 2.4),
                transform: `translateY(${progress * -40}px)`,
              }}
            >
              بابني مواقع وتطبيقات
              <span className="block text-primary">تشتغل وتبيع</span>
            </h1>

            <div className="absolute inset-x-0 bottom-24 px-6" style={{ opacity: progress > 0.12 ? 1 : 0, transition: "opacity .4s" }}>
              <div className="mx-auto max-w-xl">
                <p className="label-mono mb-2 text-primary">{band.kicker}</p>
                <h2 className="text-glow text-2xl font-bold sm:text-3xl">
                  {band.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                  {band.body}
                </p>
              </div>
            </div>

            <div
              className="absolute bottom-8 flex flex-col items-center gap-2"
              style={{ opacity: 1 - Math.min(1, progress * 4) }}
            >
              <span className="label-mono">Scroll</span>
              <span className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="reveal grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="label-mono mb-4">About</p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              أنا أستا، مطوّر بيحب التفاصيل
            </h2>
            <p className="mt-5 leading-8 text-muted-foreground">
              بشتغل مع أصحاب المشاريع من أول الفكرة لحد ما المنتج يبقى على الإنترنت. مش بسلّم
              ملفات وأمشي، بسلّم حاجة شغالة وسريعة وسهل تطويرها بعدين.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "٦+", l: "سنوات خبرة" },
                { n: "٤٠+", l: "مشروع" },
                { n: "٩٨٪", l: "عملاء راجعوا تاني" },
              ].map((s) => (
                <div key={s.l} className="surface rounded-xl px-3 py-4 text-center">
                  <p className="font-display text-2xl font-bold text-primary">{s.n}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={craftImg}
            alt="أيادي تكتب على كيبورد ميكانيكي في إضاءة خافتة"
            width={1280}
            height={912}
            loading="lazy"
            className="rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="label-mono mb-4">Services</p>
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">اللي بقدمه</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.label}
              className="reveal surface group rounded-2xl p-6 transition hover:border-primary/50"
            >
              <p className="label-mono text-accent">{s.label}</p>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="reveal overflow-hidden rounded-3xl border border-border">
          <img
            src={workImg}
            alt="لوحات واجهة زجاجية عائمة في مساحة داكنة"
            width={1280}
            height={912}
            loading="lazy"
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="bg-card p-6 sm:p-10">
            <p className="label-mono mb-6">Selected Work</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {projects.map((p) => (
                <div key={p.name} className="border-t border-border pt-4">
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 text-xs text-accent">{p.kind}</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{p.result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <p className="label-mono mb-4">FAQ</p>
        <h2 className="mb-8 text-3xl font-bold sm:text-4xl">أسئلة بتتكرر</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="reveal surface group rounded-xl p-5">
              <summary className="cursor-pointer list-none font-semibold marker:hidden">
                <span className="text-primary">+ </span>
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="mx-auto max-w-3xl px-5 pb-28 pt-10">
        <div className="reveal surface rounded-3xl p-8 text-center sm:p-12">
          <p className="label-mono mb-4">Book a call</p>
          <h2 className="text-3xl font-bold sm:text-4xl">نتكلم ١٥ دقيقة؟</h2>
          <p className="mx-auto mt-4 max-w-md leading-8 text-muted-foreground">
            احكيلي عن مشروعك وهقولك رأيي بصراحة: يستاهل يتبني إزاي، وياخد قد إيه.
          </p>
          <BookingForm />
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p>Asta Developer © {new Date().getFullYear()} — بيتبني بحب في القاهرة</p>
      </footer>
    </div>
  );
}

function BookingForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="mt-8 rounded-xl border border-primary/40 bg-primary/10 px-4 py-6 text-sm text-primary">
        وصلني طلبك. هرد عليك خلال ٢٤ ساعة على نفس الإيميل.
      </p>
    );
  }

  return (
    <form
      className="mt-8 space-y-3 text-right"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input
        required
        name="name"
        placeholder="اسمك"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="الإيميل"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <textarea
        required
        name="brief"
        rows={4}
        placeholder="المشروع عن إيه؟"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition hover:opacity-90"
      >
        ابعت الطلب
      </button>
    </form>
  );
}
