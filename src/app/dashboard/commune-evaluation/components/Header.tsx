interface HeaderProps {
  province?: string;
  district?: string;
  commune?: string;
}

export default function Header({ province, district, commune }: HeaderProps) {
  return (
    <div className="text-center gap-2">
      <div className="font-moul text-xl">សម្រាប់រដ្ឋបាលឃុំ សង្កាត់នីមួយៗ</div>
      <div className="font-moul text-lg">
        ទម្រង់ទិន្នន័យសម្រាប់ការវាយតម្លៃលទ្ធផលនៃការអនុវត្ត
      </div>
      <div className="font-moul text-lg">
        គោលនយោបាយអភិវឌ្ឍន៍ឃុំ សង្កាត់អាណត្តិទី៥ (២០២២-២០២៧)
      </div>
      <div className="font-moul text-lg">
        រាជធានី/ខេត្ត {province ?? "........."} ក្រុង/ស្រុក/ខណ្ឌ{" "}
        {district ?? "........."} រដ្ឋបាលឃុំ/សង្កាត់ {commune ?? "........."}
      </div>
      <div className="font-moul text-lg">
        សម្គាល់៖ តារាងនេះជាព័ត៌មានបឋមសម្រាប់ឃុំ សង្កាត់ត្រៀមលក្ខណៈ
      </div>
      <div className="font-siemreap text-lg text-slate-600 leading-relaxed pt-4">
        ការបំពេញទិន្នន័យ
        និងព័ត៌មានជាក់ស្តែងនឹងរៀបចំឱ្យមានការបំពេញតាមប្រព័ន្ធអនឡាញ{" "}
        <span className="font-sans">Google Form</span> តាមរយៈ{" "}
        <span className="font-sans">LINK</span> ឬស្កេន{" "}
        <span className="font-sans">QR CODE</span>។ ក្នុងមួយឃុំ សង្កាត់
        បំពេញព័ត៌មានតែម្តងនោះទេ។
      </div>
    </div>
  );
}
