import type { LanguageId, LanguageMeta, Level, Section, Lesson, LessonContent } from "./types"

export const LANGUAGES: LanguageMeta[] = [
  { id: "java", name: "Java", emoji: "☕", tagline: "من الأساسيات إلى Spring Boot", brand: "#E76F00" },
  { id: "python", name: "Python", emoji: "🐍", tagline: "من الأساسيات إلى Django والذكاء الاصطناعي", brand: "#3776AB" },
  { id: "cpp", name: "C++", emoji: "⚡", tagline: "من الأساسيات إلى الخوارزميات المتقدمة", brand: "#00599C" },
]

export const LEVELS: Level[] = ["مبتدئ", "متوسط", "متقدم", "احترافي"]

const ANGLES = [
  "مقدمة وشرح",
  "أمثلة عملية",
  "تمارين محلولة",
  "أخطاء شائعة",
  "تطبيق متقدم",
  "مشروع مصغّر",
]

interface SectionDef {
  title: string
  level: Level
  topics: string[]
}

const JAVA_SECTIONS: SectionDef[] = [
  { title: "مقدمة وإعداد بيئة Java", level: "مبتدئ", topics: ["تثبيت JDK", "أول برنامج", "بنية الكلاس", "التعليقات", "الترجمة والتشغيل"] },
  { title: "المتغيرات وأنواع البيانات", level: "مبتدئ", topics: ["int و long", "double و float", "char و boolean", "var والاستدلال", "التحويل بين الأنواع"] },
  { title: "العمليات والمعاملات", level: "مبتدئ", topics: ["العمليات الحسابية", "المقارنة", "المعاملات المنطقية", "أولوية العمليات", "معاملات البت"] },
  { title: "التحكم في التدفق", level: "مبتدئ", topics: ["if و else", "switch الكلاسيكي", "switch التعبيري", "العامل الثلاثي", "الشروط المتداخلة"] },
  { title: "الحلقات التكرارية", level: "مبتدئ", topics: ["حلقة for", "حلقة while", "do while", "for-each", "break و continue"] },
  { title: "المصفوفات", level: "مبتدئ", topics: ["تعريف المصفوفة", "المصفوفات متعددة الأبعاد", "مرور على المصفوفة", "كلاس Arrays", "البحث والترتيب"] },
  { title: "الدوال والميثودات", level: "متوسط", topics: ["تعريف الميثود", "المعاملات والإرجاع", "التحميل الزائد Overloading", "المعاملات المتغيرة varargs", "النطاق scope"] },
  { title: "البرمجة الكائنية OOP", level: "متوسط", topics: ["الكلاسات والكائنات", "الباني Constructor", "this", "التغليف Encapsulation", "الأعضاء الساكنة static"] },
  { title: "الوراثة وتعدد الأشكال", level: "متوسط", topics: ["extends", "super", "تجاوز الميثود Override", "تعدد الأشكال", "الكلاس Object"] },
  { title: "الواجهات والتجريد", level: "متوسط", topics: ["abstract class", "interface", "الميثودات الافتراضية", "الواجهات الوظيفية", "الوراثة المتعددة للواجهات"] },
  { title: "معالجة الاستثناءات", level: "متوسط", topics: ["try و catch", "finally", "throw و throws", "الاستثناءات المخصصة", "try-with-resources"] },
  { title: "المجموعات Collections", level: "متوسط", topics: ["List و ArrayList", "Set و HashSet", "Map و HashMap", "Queue و Deque", "Iterator"] },
  { title: "الجينريكس Generics", level: "متقدم", topics: ["الكلاسات العامة", "الميثودات العامة", "الحدود bounded", "wildcards", "محو الأنواع"] },
  { title: "الإدخال والإخراج I/O", level: "متقدم", topics: ["File", "قراءة الملفات", "كتابة الملفات", "Streams البايتية", "NIO و Path"] },
  { title: "الخيوط Multithreading", level: "متقدم", topics: ["Thread و Runnable", "المزامنة synchronized", "ExecutorService", "القفل Lock", "CompletableFuture"] },
  { title: "لامدا والـ Stream API", level: "متقدم", topics: ["تعابير لامدا", "مراجع الميثود", "إنشاء الـ Stream", "filter و map", "collect و reduce"] },
  { title: "قواعد البيانات JDBC", level: "متقدم", topics: ["الاتصال بقاعدة البيانات", "Statement", "PreparedStatement", "ResultSet", "المعاملات Transactions"] },
  { title: "اختبار الوحدات JUnit", level: "احترافي", topics: ["إعداد JUnit", "Assertions", "دورة حياة الاختبار", "Mockito", "اختبارات مُعلَّمة"] },
  { title: "أساسيات Spring", level: "احترافي", topics: ["حقن التبعيات DI", "Bean و Context", "التهيئة بالـ Annotations", "AOP", "ملفات الخصائص"] },
  { title: "Spring Boot و REST APIs", level: "احترافي", topics: ["إنشاء مشروع", "RestController", "JPA و Repository", "التحقق Validation", "معالجة الأخطاء العامة"] },
  { title: "مشاريع ختامية", level: "احترافي", topics: ["نظام إدارة مكتبة", "متجر إلكتروني API", "تطبيق مهام", "محرك دردشة", "لوحة تحكم"] },
]

const PYTHON_SECTIONS: SectionDef[] = [
  { title: "مقدمة وإعداد بايثون", level: "مبتدئ", topics: ["تثبيت بايثون", "المفسّر و REPL", "أول برنامج", "print و input", "التعليقات و PEP8"] },
  { title: "المتغيرات والأنواع", level: "مبتدئ", topics: ["الأعداد", "السلاسل النصية", "القيم المنطقية", "None", "التحويل بين الأنواع"] },
  { title: "السلاسل النصية", level: "مبتدئ", topics: ["التقطيع slicing", "ميثودات النصوص", "f-strings", "النصوص متعددة الأسطر", "الترميز"] },
  { title: "العمليات والمدخلات", level: "مبتدئ", topics: ["العمليات الحسابية", "المقارنة", "and و or", "أولوية العمليات", "قراءة المدخلات"] },
  { title: "الجمل الشرطية", level: "مبتدئ", topics: ["if و elif", "else", "الشروط المتداخلة", "match", "التعبير الشرطي"] },
  { title: "الحلقات", level: "مبتدئ", topics: ["حلقة for", "range", "حلقة while", "break و continue", "الحلقات المتداخلة"] },
  { title: "القوائم والـ Tuples", level: "مبتدئ", topics: ["إنشاء القوائم", "ميثودات القائمة", "list comprehension", "الـ tuples", "الفرز والترتيب"] },
  { title: "القواميس والمجموعات", level: "متوسط", topics: ["إنشاء القاموس", "الوصول والتعديل", "المرور على القاموس", "المجموعات set", "dict comprehension"] },
  { title: "الدوال", level: "متوسط", topics: ["def والإرجاع", "المعاملات الافتراضية", "args و kwargs", "النطاق و global", "الدوال المجهولة lambda"] },
  { title: "معالجة الأخطاء", level: "متوسط", topics: ["try و except", "finally", "raise", "الاستثناءات المخصصة", "كتلة else"] },
  { title: "البرمجة الكائنية", level: "متوسط", topics: ["الكلاسات", "__init__ و self", "الوراثة", "الخصائص property", "الميثودات الخاصة dunder"] },
  { title: "الوحدات والحزم", level: "متوسط", topics: ["import", "إنشاء وحدة", "الحزم packages", "المكتبة القياسية", "pip و venv"] },
  { title: "الملفات", level: "متوسط", topics: ["فتح الملفات", "القراءة والكتابة", "مدير السياق with", "JSON", "CSV"] },
  { title: "التعابير النمطية", level: "متقدم", topics: ["وحدة re", "match و search", "المجموعات groups", "الاستبدال sub", "الأنماط الشائعة"] },
  { title: "المولّدات والديكوريتر", level: "متقدم", topics: ["yield والمولّدات", "تعابير المولّد", "الديكوريتر", "ديكوريتر بمعاملات", "functools"] },
  { title: "معالجة البيانات NumPy و Pandas", level: "متقدم", topics: ["مصفوفات NumPy", "العمليات المتجهة", "DataFrame", "التنظيف والتصفية", "التجميع groupby"] },
  { title: "قواعد البيانات", level: "متقدم", topics: ["sqlite3", "الاستعلامات", "المعاملات", "SQLAlchemy", "ORM"] },
  { title: "تطوير الويب Flask", level: "احترافي", topics: ["أول تطبيق", "المسارات routes", "القوالب Jinja", "النماذج forms", "بناء REST API"] },
  { title: "إطار Django", level: "احترافي", topics: ["إنشاء مشروع", "النماذج Models", "العروض Views", "القوالب", "لوحة الإدارة admin"] },
  { title: "تعلم الآلة والذكاء الاصطناعي", level: "احترافي", topics: ["scikit-learn", "الانحدار", "التصنيف", "تقييم النماذج", "مقدمة الشبكات العصبية"] },
  { title: "مشاريع ختامية", level: "احترافي", topics: ["كاشط ويب", "بوت تيليجرام", "لوحة تحليلات", "واجهة API كاملة", "نموذج تنبؤ"] },
]

const CPP_SECTIONS: SectionDef[] = [
  { title: "مقدمة وإعداد C++", level: "مبتدئ", topics: ["المترجم gcc", "أول برنامج", "بنية main", "iostream", "الترجمة والربط"] },
  { title: "المتغيرات والأنواع", level: "مبتدئ", topics: ["int و long", "float و double", "char و bool", "auto و const", "التحويل بين الأنواع"] },
  { title: "العمليات", level: "مبتدئ", topics: ["الحسابية", "المقارنة", "المنطقية", "البت bitwise", "أولوية العمليات"] },
  { title: "الإدخال والإخراج", level: "مبتدئ", topics: ["cout", "cin", "التنسيق", "getline", "الملفات fstream"] },
  { title: "الجمل الشرطية", level: "مبتدئ", topics: ["if و else", "switch", "العامل الثلاثي", "الشروط المتداخلة", "constexpr if"] },
  { title: "الحلقات", level: "مبتدئ", topics: ["for", "while", "do while", "range-based for", "break و continue"] },
  { title: "الدوال", level: "مبتدئ", topics: ["تعريف الدالة", "المعاملات", "التمرير بالقيمة والمرجع", "التحميل الزائد", "inline و constexpr"] },
  { title: "المصفوفات والسلاسل", level: "متوسط", topics: ["المصفوفات", "السلاسل C-style", "std::string", "المصفوفات متعددة الأبعاد", "std::array"] },
  { title: "المؤشرات Pointers", level: "متوسط", topics: ["تعريف المؤشر", "إلغاء الإشارة", "حساب المؤشرات", "المؤشرات والمصفوفات", "nullptr"] },
  { title: "المراجع والذاكرة", level: "متوسط", topics: ["المراجع references", "new و delete", "تسريب الذاكرة", "المؤشرات الذكية", "RAII"] },
  { title: "البرمجة الكائنية", level: "متوسط", topics: ["الكلاسات", "الباني والهادم", "this", "التغليف", "الأعضاء static"] },
  { title: "الوراثة وتعدد الأشكال", level: "متوسط", topics: ["الوراثة", "الدوال الافتراضية virtual", "تعدد الأشكال", "الكلاسات المجردة", "override"] },
  { title: "القوالب Templates", level: "متقدم", topics: ["قوالب الدوال", "قوالب الكلاسات", "التخصيص specialization", "قوالب متغيرة variadic", "concepts"] },
  { title: "حاويات STL", level: "متقدم", topics: ["vector", "map و set", "list و deque", "unordered_map", "stack و queue"] },
  { title: "خوارزميات STL", level: "متقدم", topics: ["sort", "find و count", "transform", "accumulate", "lambda مع الخوارزميات"] },
  { title: "إدارة الذاكرة المتقدمة", level: "متقدم", topics: ["unique_ptr", "shared_ptr", "weak_ptr", "move semantics", "perfect forwarding"] },
  { title: "معالجة الاستثناءات", level: "متقدم", topics: ["try و catch", "throw", "الاستثناءات المخصصة", "noexcept", "ضمانات الأمان"] },
  { title: "هياكل البيانات", level: "احترافي", topics: ["القوائم المترابطة", "الأشجار", "أكوام Heaps", "جداول التجزئة", "الرسوم البيانية"] },
  { title: "الخوارزميات", level: "احترافي", topics: ["الفرز المتقدم", "البحث الثنائي", "البرمجة الديناميكية", "الجشع greedy", "التراجع backtracking"] },
  { title: "البرمجة التنافسية", level: "احترافي", topics: ["تسريع الإدخال", "المعالجة المسبقة", "خوارزميات الرسوم", "نظرية الأعداد", "تقنيات التحسين"] },
  { title: "مشاريع ختامية", level: "احترافي", topics: ["محرك ألعاب مصغّر", "مترجم تعبيري", "نظام ملفات", "محاكي فيزياء", "أداة سطر أوامر"] },
]

const SECTION_DEFS: Record<LanguageId, SectionDef[]> = {
  java: JAVA_SECTIONS,
  python: PYTHON_SECTIONS,
  cpp: CPP_SECTIONS,
}

// 20 sections of 24 lessons + final section of 20 = 500 per language
function lessonCountForSection(index: number, total: number): number {
  return index === total - 1 ? 20 : 24
}

function buildLanguage(languageId: LanguageId): { sections: Section[]; lessons: Lesson[] } {
  const defs = SECTION_DEFS[languageId]
  const sections: Section[] = []
  const lessons: Lesson[] = []
  let globalIndex = 0

  defs.forEach((def, sIdx) => {
    const lessonCount = lessonCountForSection(sIdx, defs.length)
    const sectionId = `${languageId}-s${sIdx + 1}`
    sections.push({
      id: sectionId,
      language: languageId,
      index: sIdx + 1,
      title: def.title,
      level: def.level,
      topics: def.topics,
      lessonCount,
    })

    for (let i = 0; i < lessonCount; i++) {
      const topic = def.topics[i % def.topics.length]
      const angle = ANGLES[Math.floor(i / def.topics.length) % ANGLES.length]
      globalIndex++
      lessons.push({
        id: `${sectionId}-l${i + 1}`,
        language: languageId,
        sectionId,
        sectionTitle: def.title,
        sectionIndex: sIdx + 1,
        level: def.level,
        index: i + 1,
        globalIndex,
        title: `${topic} — ${angle}`,
        topic,
        angle,
      })
    }
  })

  return { sections, lessons }
}

const CACHE: Partial<Record<LanguageId, { sections: Section[]; lessons: Lesson[] }>> = {}

export function getCurriculum(languageId: LanguageId): { sections: Section[]; lessons: Lesson[] } {
  if (!CACHE[languageId]) {
    CACHE[languageId] = buildLanguage(languageId)
  }
  return CACHE[languageId]!
}

export function getLanguageMeta(languageId: LanguageId): LanguageMeta {
  return LANGUAGES.find((l) => l.id === languageId)!
}

// ---------------- Lesson content generation ----------------

function codeExample(lesson: Lesson): string {
  const t = lesson.topic
  if (lesson.language === "java") {
    return `// مثال: ${t}
public class Demo {
    public static void main(String[] args) {
        // نوضح فكرة "${t}" خطوة بخطوة
        System.out.println("بداية الدرس: ${t}");

        int total = 0;
        for (int i = 1; i <= 5; i++) {
            total += i; // تجميع القيم
        }

        System.out.println("النتيجة = " + total);
    }
}`
  }
  if (lesson.language === "python") {
    return `# مثال: ${t}
def demo():
    """نوضح فكرة "${t}" خطوة بخطوة"""
    print("بداية الدرس:", "${t}")

    total = 0
    for i in range(1, 6):
        total += i  # تجميع القيم

    print("النتيجة =", total)
    return total


if __name__ == "__main__":
    demo()`
  }
  return `// مثال: ${t}
#include <iostream>
using namespace std;

int main() {
    // نوضح فكرة "${t}" خطوة بخطوة
    cout << "بداية الدرس: ${t}" << endl;

    int total = 0;
    for (int i = 1; i <= 5; ++i) {
        total += i; // تجميع القيم
    }

    cout << "النتيجة = " << total << endl;
    return 0;
}`
}

function solutionExample(lesson: Lesson): string {
  const t = lesson.topic
  if (lesson.language === "java") {
    return `// الحل النموذجي للتمرين على "${t}"
public class Solution {
    public static int solve(int[] data) {
        int result = 0;
        for (int value : data) {
            if (value % 2 == 0) {   // نطبّق شرط ${t}
                result += value;
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] sample = {1, 2, 3, 4, 5, 6};
        System.out.println("الناتج = " + solve(sample)); // 12
    }
}`
  }
  if (lesson.language === "python") {
    return `# الحل النموذجي للتمرين على "${t}"
def solve(data):
    result = 0
    for value in data:
        if value % 2 == 0:   # نطبّق شرط ${t}
            result += value
    return result


sample = [1, 2, 3, 4, 5, 6]
print("الناتج =", solve(sample))  # 12`
  }
  return `// الحل النموذجي للتمرين على "${t}"
#include <iostream>
#include <vector>
using namespace std;

int solve(const vector<int>& data) {
    int result = 0;
    for (int value : data) {
        if (value % 2 == 0) {   // نطبّق شرط ${t}
            result += value;
        }
    }
    return result;
}

int main() {
    vector<int> sample = {1, 2, 3, 4, 5, 6};
    cout << "الناتج = " << solve(sample) << endl; // 12
    return 0;
}`
}

export function buildLessonContent(lesson: Lesson): LessonContent {
  const { topic, angle, sectionTitle } = lesson
  const langName = getLanguageMeta(lesson.language).name

  const introByAngle: Record<string, string> = {
    "مقدمة وشرح": `في هذا الدرس نتعرّف على مفهوم "${topic}" ضمن قسم "${sectionTitle}" بلغة ${langName}، ونفهم لماذا يُعدّ أساسياً وكيف يُستخدم عملياً.`,
    "أمثلة عملية": `نطبّق "${topic}" عبر أمثلة عملية واقعية بلغة ${langName} لترسيخ الفهم وربط النظرية بالكود.`,
    "تمارين محلولة": `نحلّ تمارين متدرّجة الصعوبة على "${topic}" مع شرح خطوات الحل والتفكير المنطقي وراءه.`,
    "أخطاء شائعة": `نستعرض الأخطاء الشائعة عند التعامل مع "${topic}" وكيفية تجنّبها واكتشافها بسرعة.`,
    "تطبيق متقدم": `ننتقل إلى استخدام "${topic}" في سيناريوهات أكثر تعقيداً وأقرب لمشاريع الإنتاج.`,
    "مشروع مصغّر": `نبني مشروعاً مصغّراً يوظّف "${topic}" من البداية للنهاية لتطبيق ما تعلّمناه.`,
  }

  return {
    intro: introByAngle[angle] ?? introByAngle["مقدمة وشرح"],
    objectives: [
      `فهم مفهوم "${topic}" وبناؤه الصحيح بلغة ${langName}`,
      `تطبيق "${topic}" في كود يعمل دون أخطاء`,
      `التعرّف على أفضل الممارسات وتجنّب الأخطاء الشائعة`,
      `حلّ تمرين تطبيقي وقياس مستوى الإتقان`,
    ],
    explanation: [
      `يُعدّ "${topic}" من المفاهيم المحورية في قسم "${sectionTitle}". سنبدأ بتعريفه ثم ننتقل تدريجياً إلى التطبيق.`,
      `القاعدة الأساسية: اكتب الكود بوضوح، اختبره بقيم بسيطة أولاً، ثم وسّعه ليشمل الحالات الحدّية. هذا يقلّل الأخطاء كثيراً.`,
      `راقب القيم خطوة بخطوة، وتأكّد من أنّ كل سطر يؤدّي الغرض المطلوب قبل الانتقال للسطر التالي.`,
    ],
    code: codeExample(lesson),
    solution: solutionExample(lesson),
    hint: `تلميح: قسّم المسألة المتعلقة بـ "${topic}" إلى خطوات صغيرة. ابدأ بحالة واحدة بسيطة، تحقّق من صحتها، ثم عمّمها. تذكّر التعامل مع الحالات الحدّية (القيم الفارغة أو الحدّية).`,
    exercise: `اكتب برنامجاً بلغة ${langName} يوظّف "${topic}" لحل المسألة التالية: استقبل مجموعة من القيم، عالجها بحسب القاعدة التي تعلّمتها في هذا الدرس، ثم اطبع النتيجة النهائية. تأكّد من اختبار الكود بمدخلات مختلفة.`,
  }
}
