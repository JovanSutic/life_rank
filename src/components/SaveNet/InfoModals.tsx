function InfoModals({ modalType }: { modalType: string }) {
  const getModal = (modalType: string) => {
    if (modalType === 'isIndependent') {
      return (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">Independence Test (Serbia)</h3>

          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>📋 What is it?</strong> The independence test determines whether a
              self-employed person is truly independent or effectively working as an employee under
              a contractor label.
            </li>
            <li>
              <strong>🛡️ Why does it exist?</strong> To prevent tax avoidance where businesses avoid
              hiring employees by engaging contractors who work full-time for them.
            </li>
            <li>
              <strong>✅ When do you pass?</strong> You pass the test if you meet{' '}
              <strong>4 or fewer</strong> of the 9 conditions below.
            </li>
            <li>
              <strong>⚠️ When do you fail?</strong> Meeting <strong>5 or more</strong> conditions
              means you're considered a <em>dependent contractor</em>, which may disqualify you from
              flat-rate taxation and trigger higher taxes.
            </li>
          </ul>

          <h4 className="text-base font-semibold mt-6 mb-3 text-gray-800">The 9 Conditions:</h4>

          <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
            <li>
              🕒 Your client sets your working hours or controls your vacations, and your pay
              doesn't decrease if you take time off.
            </li>
            <li>🏢 You usually work from the client’s location or a space they choose.</li>
            <li>📚 The client pays for or organizes your training or upskilling.</li>
            <li>🔍 You were hired through a job ad or recruitment agency, like an employee.</li>
            <li>
              🛠️ The client provides your tools, software, or equipment, or directly manages your
              work process.
            </li>
            <li>💰 Over 70% of your income in a year comes from a single client.</li>
            <li>
              🧾 You do the same type of work the client does, but bear no business risk for the
              outcome.
            </li>
            <li>🚫 Your contract prohibits (fully or partially) working with other clients.</li>
            <li>📆 You work for the same client 130+ days in a 12-month period.</li>
          </ul>

          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">
              The test is evaluated based on your contracts and actual working conditions. You don’t
              need to meet all 9 criteria to fail — just <strong>5 or more</strong>.
            </p>
            <p className="text-sm text-gray-600">
              If you pass (i.e., 4 or fewer apply), you're considered an{' '}
              <strong>independent contractor</strong> and may qualify as self employed.
            </p>
          </div>
        </div>
      );
    }
    if (modalType === 'isUSCitizen') {
      return (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">
            U.S. Citizenship & Global Taxation
          </h3>

          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>🇺🇸 Why do we ask?</strong> The United States has a unique tax system where
              citizens are taxed on their worldwide income, even if they live and work abroad.
            </li>
            <li>
              <strong>💼 What does it mean?</strong> If you're a U.S. citizen or hold dual
              citizenship, you may have to report your income to the IRS and potentially pay
              additional U.S. taxes — even if you’re fully compliant with tax laws.
            </li>
            <li>
              <strong>⚠️ Who should check this?</strong> Check this box if you're a U.S. citizen,
              dual national, or green card holder, even if you’re living outside the U.S.
            </li>
            <li>
              <strong>🧮 Why it matters?</strong> We need this information to give you a realistic
              tax projection and warn you about possible double taxation risks.
            </li>
          </ul>

          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">
              The U.S. is one of the few countries that taxes based on citizenship rather than
              residency. If this applies to you, it's highly recommended to consult with a U.S. tax
              advisor familiar with international income.
            </p>
            <p className="text-sm text-gray-600">
              If you're <strong>not a U.S. citizen</strong> or green card holder, you can safely
              leave this box unchecked.
            </p>
          </div>
        </div>
      );
    }
    if (modalType === 'isStartup') {
      return (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">
            Forfettario Regime – New Business Status
          </h3>

          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>💡 Why do we ask?</strong> In Italy’s <em>Regime Forfettario</em>, new
              businesses may qualify for a reduced tax rate of <strong>5%</strong> for the first 5
              years instead of the standard 15%.
            </li>
            <li>
              <strong>🎯 What does “new business” mean?</strong> You must be starting a completely
              new activity — one you haven’t performed professionally in the past 3 years, either as
              an employee, freelancer, or business owner.
            </li>
            <li>
              <strong>⚠️ Real conditions:</strong> To qualify for the 5% rate, all of the following
              must be true:
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>
                  You haven’t carried out the same activity in the past 3 years (in any form).
                </li>
                <li>You’re not continuing your previous employer’s business under a new name.</li>
                <li>
                  Your new business is not a continuation of a previous company you were part of.
                </li>
              </ul>
            </li>
            <li>
              <strong>📑 Documentation:</strong> The tax office may request proof (e.g. contracts,
              CV, activity history) to confirm you’re truly starting fresh.
            </li>
          </ul>

          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">
              If any of these conditions are not met — for example, if you're offering the same
              services as you did before under a different form — you may be excluded from the 5%
              rate and taxed at the standard 15%.
            </p>
            <p className="text-sm text-gray-600">
              Only select this if you are truly launching a brand-new activity with no recent
              history in the same field.
            </p>
          </div>
        </div>
      );
    }
    if (modalType === 'isSpecialist') {
      return (
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">
            Impatriati Regime – Certified Specialist Status
          </h3>

          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>💡 Why do we ask?</strong> Some professionals under Italy’s{' '}
              <em>Impatriati Regime</em> may access a <strong>higher tax exemption</strong> if they
              are considered certified or highly qualified specialists.
            </li>
            <li>
              <strong>🎓 What is a "certified specialist"?</strong> This typically means you have
              formal qualifications for a highly skilled role — such as:
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>A relevant university degree or equivalent academic diploma</li>
                <li>
                  Recognized professional certifications or licenses (national or international)
                </li>
                <li>
                  Proof of specialized experience in high-skill sectors (e.g. tech, finance,
                  medicine, academia)
                </li>
              </ul>
            </li>
            <li>
              <strong>📋 What professions usually qualify?</strong> Common examples include:
              engineers, doctors, professors, researchers, architects, IT experts, and other
              regulated or certified professions.
            </li>
          </ul>

          <div className="my-6">
            <p className="text-sm text-gray-600 mb-2">
              This status is generally validated by the Italian tax authority and may require
              documentation like diplomas, certifications, or detailed contracts showing the nature
              of your role.
            </p>
            <p className="text-sm text-gray-600">
              Only check this if you have a recognized degree, professional license, or proven
              high-skill expertise relevant to your job.
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  return <div className="w-full overflow-y-auto max-h-[90vh]">{getModal(modalType)}</div>;
}

export default InfoModals;
