export type ContentPillar = {
  id: "pattern" | "observe" | "practice" | "review";
  number: string;
  title: string;
  description: string;
  examples: readonly string[];
  visual: "profile" | "path" | "tools" | "review";
};

export const CONTENT_PILLARS: readonly ContentPillar[] = [
  {
    id: "pattern",
    number: "۰۱",
    title: "الگوی خودت را بشناس",
    description:
      "تست ۳۵ سؤالی نشان می‌دهد در رفتار معاملاتی اخیرت کدام آرکیتایپ پررنگ‌تر بوده؛ کجا از نقطه قوتت استفاده می‌کنی و همان نقطه قوت کجا ممکن است به سایه رفتاری تبدیل شود.",
    examples: ["آرکیتایپ غالب", "نقاط قوت و سایه رفتاری", "الگوهای تصمیم‌گیری"],
    visual: "profile",
  },
  {
    id: "observe",
    number: "۰۲",
    title: "رفتارت را مشاهده کن",
    description:
      "قرار نیست فقط درباره رفتار بخوانی. با تمرین‌های کوتاه، احساس قبل از ورود، تصمیم بعد از ضرر، موقعیت‌های FOMO و معامله‌های خارج از پلن را ثبت می‌کنی.",
    examples: ["تمرین رفتاری", "Reflection روزانه یا هفتگی", "شناسایی محرک‌ها"],
    visual: "path",
  },
  {
    id: "practice",
    number: "۰۳",
    title: "روی الگوی خودت کار کن",
    description:
      "محتوای هر آرکیتایپ از زاویه همان الگو نوشته می‌شود. Purple Quest، راهنماها و فایل‌های کاربردی کمک می‌کنند یک موضوع مشخص را به چند قدم قابل انجام تبدیل کنی.",
    examples: ["محتوای مخصوص آرکیتایپ", "Purple Quest", "PDF، چک‌لیست و Workbook"],
    visual: "tools",
  },
  {
    id: "review",
    number: "۰۴",
    title: "تغییراتت را بررسی کن",
    description:
      "نتیجه اول، خط پایه توست. بعد از یک دوره تمرین می‌توانی یادداشت‌ها و تصمیم‌هایت را مرور کنی و تست را دوباره انجام بدهی تا تمرکز بعدی روشن‌تر شود.",
    examples: ["ارزیابی پایه", "مرور دوره‌ای", "بازآزمایی و تعیین تمرکز بعدی"],
    visual: "review",
  },
] as const;

export const PERSONALIZED_PATHS = [
  { archetype: "ORACLE", title: "تحلیلگر شواهد", preview: "تشخیص مرز میان تحلیل بیشتر و عقب‌انداختن تصمیم." },
  { archetype: "ARCHITECT", title: "معمار فرایند", preview: "دیدن لحظه‌ای که پایبندی به ساختار به انعطاف‌ناپذیری تبدیل می‌شود." },
  { archetype: "ALCHEMIST", title: "یادگیرنده منعطف", preview: "فرق‌گذاشتن میان یادگیری واقعی و تغییر مداوم روش." },
  { archetype: "PHANTOM", title: "ناظر هیجان", preview: "ایجاد فاصله بعد از ضرر، بدون کناره‌گیری از تصمیم." },
  { archetype: "SOVEREIGN", title: "فرمانروای ریسک", preview: "حفظ قانون ریسک، مخصوصاً وقتی اعتمادبه‌نفس بالا می‌رود." },
] as const;

export const DELIVERY_NOTES = [
  {
    title: "فایل‌های کاربردی",
    text: "راهنمای آرکیتایپ، چک‌لیست قبل از معامله، فرم Reflection، ژورنال رفتاری و تمرین‌های هفتگی؛ هر زمان که برای مسیر مربوط آماده باشند.",
  },
  {
    title: "محتوای تکمیلی Eventum",
    text: "بسته به موضوع، ممکن است نکات یک اپیزود، سؤال‌های Reflection، تمرین مرتبط، توضیح تکمیلی فرید یا Voice Note منتشر شود.",
  },
  {
    title: "تعامل‌های محدود",
    text: "در صورت برنامه‌ریزی، ممکن است پرسش‌وپاسخ، جلسه موضوع‌محور، مرور Purple Quest یا حضور مهمان متخصص برگزار شود؛ نه به‌عنوان سرویس دائمی یا مشاوره فردی.",
  },
] as const;
