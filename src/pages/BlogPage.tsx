import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';

const HealthcareBlog: React.FC = () => {
  return (
    <div className="w-full lg:w-[764px] mx-auto px-4 pt-4 md:pt-8 pb-2 text-gray-800">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi4nSe5XsUcP1hhBX4Qpaw6sFN-ej9KH1smg&s"
        alt="Italian healthcare"
        className="w-full h-64 object-cover rounded-md mb-8 mt-4"
      />

      <h1 className="text-2xl text-center font-bold mb-6">
        Understanding Healthcare System in Italy
      </h1>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Introduction</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Italy’s healthcare system is a blend of public and private services. The public system,
          known as the SSN (Servizio Sanitario Nazionale), guarantees access to essential health
          services for residents. However, the SSN is managed regionally, meaning each of Italy’s 20
          regions operates its own regional health service (SSR) connected to the national SSN
          framework. Because of this, healthcare quality, wait times, and available services can
          vary depending on the region you live in. Additionally, your healthcare experience may
          also vary based on your residency status (EU or non-EU), income, and personal preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Public Healthcare (SSN)</h2>
        <p className="text-sm md:text-base leading-relaxed">
          The SSN is tax-funded and provides most core services including general practitioners,
          hospital care, specialist visits, emergency care, and prescriptions (with co-pays). It is
          managed at the regional level, meaning quality and wait times vary by location. For
          non-working residents (such as retirees or elective visa holders), access to the SSN
          requires voluntary enrollment and an annual contribution — currently a minimum of €2,000.
          This fee covers both the applicant and dependent family members (such as a spouse or
          children).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Healthcare for EU Citizens</h2>
        <p className="text-sm md:text-base leading-relaxed">
          EU citizens can access urgent care using the European Health Insurance Card (EHIC). For
          stays over 90 days, you are expected to register with the SSN, often free of charge if
          working, studying, or part of a registered household. Registration requires a residence
          permit, tax code (codice fiscale), and in some cases an ISEE (income statement).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Healthcare for Non-EU Citizens</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Non-EU residents with work or family-based permits usually qualify for free SSN
          registration. Others — like early retirees — must enroll voluntarily and pay an annual
          contribution (currently starting at 2,000€). This gives access to the same services as
          citizens but does not cover every private or non-essential treatment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Private Healthcare</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Many Italians and expats supplement the SSN with private healthcare. Reasons include
          shorter wait times, English-speaking doctors, and greater choice of specialists. Private
          care is commonly used for diagnostic imaging (like MRIs and CT scans), specialist
          consultations (e.g. dermatology, orthopedics), mental health services, elective surgeries,
          and maternity care. Costs for private visits typically range from 50–150€, with insurance
          options starting around 1,300€ annually for basic coverage.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">
          Cost Sharing, ISEE, and Reimbursements
        </h2>
        <p className="text-sm md:text-base leading-relaxed">
          While many healthcare services are free under the SSN, some require “ticket” co-pays—small
          fees for visits, tests, or prescriptions. These co-pays vary by region and service type.
          If your household income is below certain thresholds, you may qualify for partial or full
          exemptions through the ISEE (Indicatore della Situazione Economica Equivalente), Italy’s
          official means-testing system. These thresholds differ by region but generally range
          around 8,500€ to 36,000€ per year, depending on family size and local rules. Note that
          these exemptions and co-pay rules apply only to services provided through the SSN and do
          not cover private healthcare costs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Regional Differences</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Northern Italy generally has better healthcare infrastructure, more specialists, and
          shorter wait times than the South. For example, regions like Lombardy and Emilia-Romagna
          often perform well in national healthcare benchmarks, offering a wide range of private
          care options. Within regions, large cities such as Milan, Bologna, and Turin typically
          have more advanced facilities and easier access to specialists compared to smaller towns
          and rural areas, where services can be limited and wait times longer. In Southern regions
          like Puglia, both urban centers and smaller towns may face longer delays and fewer private
          care choices, making access to timely healthcare more challenging.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-2">Summary</h2>
        <p className="text-sm md:text-base leading-relaxed">
          Italy offers a strong, affordable public healthcare system. However, your experience will
          depend on your residency type, region, and whether you choose to supplement with private
          care. Understanding SSN registration, ISEE benefits, and the insurance landscape is key to
          managing your healthcare as an expat or long-term resident.
        </p>
      </section>
    </div>
  );
};

function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  if (slug !== 'healthcare-system-italy') {
    return <div className="text-center text-2xl">Blog you are looking for doesn't exist.</div>;
  }
  return (
    <div className="relative flex flex-col min-h-screen w-full lg:w-[764px] px-2 pb-6 pt-2 mx-auto">
      <HealthcareBlog />
      <div className="flex justify-left">
        <button
          onClick={() => navigate(-1)}
          className="inline-block px-4 py-2 text-base md:text-lg text-blue-600 font-medium rounded-md underline cursor-pointer"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default BlogPage;
