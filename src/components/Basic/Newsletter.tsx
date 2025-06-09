/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export default function Newsletter() {
  const formRef = useRef<HTMLDivElement>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (window as any).ml_webform_success_27008806 = () => {
      setSuccess(true);
    };

    // Append the MailerLite script
    const script = document.createElement('script');
    script.src =
      'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    script.type = 'text/javascript';
    script.async = true;
    formRef.current?.appendChild(script);

    return () => {
      delete (window as any).ml_webform_success_27008806;
    };
  }, []);

  if (success) {
    return (
      <div className="bg-gray-50 p-6 rounded-md max-w-xl mx-auto text-center">
        <h4 className="text-2xl md:text-3xl font-medium mb-2">Thank you! 🎉</h4>
        <p className="text-gray-700">You have successfully joined our newsletter list.</p>
      </div>
    );
  }

  return (
    <div ref={formRef}>
      <div
        id="mlb2-27008806"
        className="bg-gray-50 ml-form-embedContainer ml-subscribe-form ml-subscribe-form-27008806"
      >
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <div className="ml-form-embedContent">
                <h4 className="text-2xl md:text-3xl font-medium mb-4">📧 Newsletter</h4>
                <p className="text-gray-600 mb-2 max-w-xl mx-auto">
                  Escape to a peaceful, family-friendly place where life slows down and moments
                  truly matter. Get a new city report every week to help you find your place in
                  Europe.
                </p>
              </div>
              <form
                className="ml-block-form flex flex-col items-center"
                action="https://assets.mailerlite.com/jsonp/1582765/forms/156739693750257395/subscribe"
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent">
                  <div className="ml-form-fieldRow ml-last-item">
                    <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required w-full md:w-[360px] mb-3">
                      <input
                        aria-label="email"
                        aria-required="true"
                        type="email"
                        className="form-control w-full px-4 py-2 text-16 border border-gray-400 rounded-lg bg-white"
                        name="fields[email]"
                        placeholder="Email"
                        autoComplete="email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <input type="hidden" name="ml-submit" value="1" />
                <div className="ml-form-embedSubmit mt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-800 text-white text-base font-medium rounded-md inline-flex items-center gap-3 hover:bg-blue-700 transition cursor-pointer"
                  >
                    Subscribe
                  </button>
                </div>
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            {/* Hide MailerLite default success message (we handle success ourselves) */}
            <div className="ml-form-successBody row-success hidden">
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined our newsletter list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
