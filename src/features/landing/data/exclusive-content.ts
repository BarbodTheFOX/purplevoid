export type ContentPillar = {
  id: "pattern" | "training" | "depth" | "evolution";
  number: string;
  title: string;
  description: string;
  examples: readonly string[];
  visual: "profile" | "path" | "archive" | "progress";
};

export type FeaturedContent = {
  id: "playbook" | "voice" | "quest" | "uncut" | "workbook";
  eyebrow: string;
  title: string;
  description: string;
  format: string;
  placeholder: boolean;
};

export const CONTENT_PILLARS: readonly ContentPillar[] = [
  {
    id: "pattern",
    number: "۰۱",
    title: "شناخت الگو",
    description: "نتیجه تست به یک گزارش ساده ختم نمی‌شه. قدرت، سایه، محرک‌ها و رفتار تو زیر فشار به یک نقشه قابل استفاده تبدیل می‌شن.",
    examples: ["نتیجه آرکیتایپ", "راهنمای اختصاصی", "ارزیابی پایه رفتاری"],
    visual: "profile",
  },
  {
    id: "training",
    number: "۰۲",
    title: "تمرین رفتار",
    description: "شناخت وقتی ارزش پیدا می‌کنه که وارد معامله بعدی بشه. مأموریت‌ها و بازتاب‌ها کمک می‌کنن یک رفتار را در عمل ببینی و تمرین بدی.",
    examples: ["مأموریت‌های رفتاری", "Purple Quest", "بازتاب و چالش هفتگی"],
    visual: "path",
  },
  {
    id: "depth",
    number: "۰۳",
    title: "محتوای عمیق",
    description: "محتوا فقط بیشتر نیست؛ یک لایه عمیق‌تره. موضوع‌ها از زاویه رفتار معامله‌گر باز می‌شن و با تمرین یا ابزار اجرایی ادامه پیدا می‌کنن.",
    examples: ["راهنما و فایل اختصاصی", "نسخه‌های کامل و پشت‌صحنه", "یادداشت‌های صوتی"],
    visual: "archive",
  },
  {
    id: "evolution",
    number: "۰۴",
    title: "ردیابی پیشرفت",
    description: "قرار نیست فقط حس کنی بهتر شدی. ارزیابی ماهانه، زنجیره تداوم و مقایسه رفتار کمک می‌کنن مسیرت را با گذشته خودت ببینی.",
    examples: ["مرور ماهانه", "امتیاز و زنجیره تداوم", "گزارش پیشرفت"],
    visual: "progress",
  },
] as const;

export const FEATURED_CONTENT: readonly FeaturedContent[] = [
  {
    id: "playbook",
    eyebrow: "راهنمای اختصاصی آرکیتایپ",
    title: "از شناخت الگو تا چک‌لیست قبل و بعد از معامله",
    description: "ساختار Playbook شامل قدرت، سایه، محرک‌های رایج، رفتار هنگام سود و ضرر و مسیر تمرین می‌شه.",
    format: "پیش‌نمایش سند",
    placeholder: true,
  },
  {
    id: "voice",
    eyebrow: "یادداشت صوتی فرید",
    title: "یک توضیح کوتاه، درست قبل از شروع هفته معاملاتی",
    description: "رابط نمونه برای یادداشت‌های صوتی اختصاصی؛ فایل و عنوان واقعی بعد از تولید محتوا جایگزین می‌شن.",
    format: "رابط صوتی نمونه",
    placeholder: true,
  },
  {
    id: "quest",
    eyebrow: "Purple Quest",
    title: "یک موضوع، چند مرحله و یک بازتاب نهایی",
    description: "نمونه ساختار یک مسیر چندروزه برای مشاهده متمرکز یک رفتار؛ نه مسابقه و نه امتیازگیری نمایشی.",
    format: "مسیر تمرینی",
    placeholder: true,
  },
  {
    id: "uncut",
    eyebrow: "نسخه کامل و ادامه گفتگو",
    title: "جایی که بحث عمومی تمام می‌شه، لایه بعدی شروع می‌شه",
    description: "نسخه کامل گفتگوها، بخش‌های حذف‌شده و تحلیل تکمیلی تیم Eventum در این قالب قرار می‌گیرن.",
    format: "پیش‌نمایش ویدیو",
    placeholder: true,
  },
  {
    id: "workbook",
    eyebrow: "دفترکار رفتاری",
    title: "محتوا را ببین، بعد روی رفتار خودت کار کن",
    description: "فرم بازبینی معامله، بازتاب روزانه، نقشه محرک‌ها و برنامه‌های چندروزه در قالب فایل‌های قابل تکمیل ارائه می‌شن.",
    format: "پیش‌نمایش فایل",
    placeholder: true,
  },
] as const;

export const PERSONALIZED_PATHS = [
  { archetype: "ORACLE", title: "تحلیلگر شواهد", preview: "خروج از چرخه تحلیل، بدون تصمیم عجولانه." },
  { archetype: "ARCHITECT", title: "معمار فرایند", preview: "انعطاف‌پذیری، بدون از دست‌دادن ساختار." },
  { archetype: "ALCHEMIST", title: "یادگیرنده منعطف", preview: "حفظ ثبات، در کنار میل به تغییر." },
  { archetype: "PHANTOM", title: "ناظر هیجان", preview: "برگشتن از فاصله‌گرفتن به مشارکت آگاهانه." },
  { archetype: "SOVEREIGN", title: "فرمانروای ریسک", preview: "قدرت تصمیم‌گیری، بدون افتادن در دام غرور." },
] as const;
