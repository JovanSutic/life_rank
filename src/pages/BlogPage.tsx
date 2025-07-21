import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchBlogBySlug } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';
import AsyncStateWrapper from '../components/AsyncWrapper';
import BlogSeo from '../components/Blogs/BlogSeo';
import ResponsiveTable from '../components/Healthcare/ResponsiveTable';
import DOMPurify from 'dompurify';
import { useMapStore } from '../stores/mapStore';
import NewsletterModal from '../components/Basic/NewsletterModal';

function BlogPage() {
  const { slug } = useParams();
  const { newsLetterShow, toggleNewsletterShow } = useMapStore();
  const navigate = useNavigate();

  const {
    data: blogData,
    isLoading: blogIsLoading,
    isFetching: blogIsFetching,
    isError: blogIsError,
    error: blogError,
  } = useQuery({
    queryKey: ['GET_BLOG_SINGLE', slug],
    queryFn: () => fetchBlogBySlug(slug!),
    enabled: !!slug,
    retry: 2,
    staleTime: 60 * 60 * 1000,
  });

  if (!slug) {
    return <div className="text-center text-2xl">Blog you are looking for doesn't exist.</div>;
  }
  return (
    <div className="relative flex flex-col min-h-screen w-full lg:w-[764px] px-2 pb-6 pt-2 mx-auto">
      <AsyncStateWrapper
        isLoading={blogIsLoading || blogIsFetching}
        isError={blogIsError}
        error={blogError ? Error("Blog you are looking for doesn't exist.") : null}
      >
        <BlogSeo
          title={blogData?.title || ''}
          description={blogData?.description || ''}
          keywords={blogData?.keywords || ''}
        />
        <div>
          <NewsletterModal show={newsLetterShow} onClose={toggleNewsletterShow} />
          <div>
            {blogData?.blog_sections.map((item, index) => {
              if (item.type === 'title') {
                return (
                  <h1 className="text-2xl text-center font-bold" key={`${item.type}${index}`}>
                    {item.content}
                  </h1>
                );
              }
              if (item.type === 'subtitle') {
                return (
                  <h4
                    className="text-lg md:text-xl font-semibold mt-8"
                    key={`${item.type}${index}`}
                  >
                    {item.content}
                  </h4>
                );
              }
              if (item.type === 'text') {
                return (
                  <p
                    className="text-sm md:text-base leading-relaxed mt-2"
                    key={`${item.type}${index}`}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
                  />
                );
              }
              if (item.type === 'smalltitle') {
                return (
                  <p
                    className="text-sm md:text-base font-bold leading-relaxed mt-4"
                    key={`${item.type}${index}`}
                  >
                    {item.content}
                  </p>
                );
              }
              if (item.type === 'list') {
                return (
                  <div className="mb-4 mt-4" key={`${item.type}${index}`}>
                    {JSON.parse(item.content).map((item: string, iNum: number) => (
                      <p
                        className="text-sm md:text-base text-gray-800 mb-4 pb-2 border-b border-gray-200"
                        key={`list_nu${index}${iNum}`}
                      >
                        ✅ {item}
                      </p>
                    ))}
                  </div>
                );
              }
              if (item.type === 'footnote') {
                return (
                  <p
                    className="text-sm md:text-base italic leading-relaxed"
                    key={`${item.type}${index}`}
                  >
                    {item.content}
                  </p>
                );
              }
              if (item.type === 'table') {
                return (
                  <div className="mt-4 mb-4" key={`${item.type}${index}`}>
                    <ResponsiveTable
                      headers={JSON.parse(item.note!)}
                      data={JSON.parse(item.content)}
                    />
                  </div>
                );
              }
              if (item.type === 'button') {
                return (
                  <section className="mt-4" key={`${item.type}${index}`}>
                    <div className="flex justify-center">
                      <Link
                        to={item.note!}
                        className="inline-block px-4 py-1.5 rounded-lg bg-blue-100 text-blue-800 font-semibold text-sm hover:bg-blue-200 uppercase"
                      >
                        {item.content}
                      </Link>
                    </div>
                  </section>
                );
              }
              if (item.type === 'newsletter') {
                return (
                  <section className="mt-8" key={`${item.type}${index}`}>
                    <p className="text-center text-lg md:text-xl mb-2">You like this content?</p>
                    <div className="flex justify-center">
                      <button
                        onClick={toggleNewsletterShow}
                        className="inline-block cursor-pointer px-4 py-1.5 rounded-lg bg-blue-500 text-white font-semibold text-sm hover:bg-blue-700"
                      >
                        📧 Subscribe to our newsletter
                      </button>
                    </div>
                  </section>
                );
              }
            })}
          </div>
          {/* {blog} */}
          <div className="flex justify-center mt-8 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white font-semibold text-md hover:bg-blue-700"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Go back
            </button>
          </div>
        </div>
      </AsyncStateWrapper>
    </div>
  );
}

export default BlogPage;
