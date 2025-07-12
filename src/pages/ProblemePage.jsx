import React, { useEffect } from 'react';

export default function ProblemePage() {
  useEffect(() => {
    console.log("✅ ProblemePage component mounted");
  }, []);

  return (
    <div className="text-center mt-10 text-red-600 text-xl">
      📥 صفحة المشاكل والاقتراحات
    </div>
  );
}
