import { useEffect, useState } from 'react';
import { useMapStore } from '../stores/mapStore';
import TopLogo from '../components/Basic/TopLogo';
// import Tabs from '../components/Basic/Tabs';
import AsyncStateWrapper from '../components/AsyncWrapper';
import { useQuery } from '@tanstack/react-query';
import { getUserReportById, getUserReports } from '../utils/apiCalls';
import { checkAndRefreshToken, getIdToken } from '../utils/token';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ReportItem from '../components/Dashboard/ReportItem';
import ReportTable from '../components/Dashboard/ReportTable';

function DashboardPage() {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId');

  const [tab] = useState('Reports');
  const { setSaveNetData } = useMapStore();
  const navigate = useNavigate();

  const {
    data: reportItemData,
    isLoading: reportItemIsLoading,
    isFetching: reportItemIsFetching,
    isError: reportItemIsError,
    error: reportItemError,
  } = useQuery({
    queryKey: ['GET_USER_REPORT', reportId],
    queryFn: async () => {
      const tokenValid = await checkAndRefreshToken();
      if (!tokenValid) {
        navigate('/login'); // Redirect if token refresh fails
        return;
      }
      const token = getIdToken();
      return getUserReportById(Number(reportId), token); // Pass token to API
    },
    enabled: !!reportId,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  const {
    data: reportsData,
    isLoading: reportsIsLoading,
    isFetching: reportsIsFetching,
    isError: reportsIsError,
    error: reportsError,
  } = useQuery({
    queryKey: ['GET_USER_REPORTS'],
    queryFn: async () => {
      const tokenValid = await checkAndRefreshToken();
      if (!tokenValid) {
        navigate('/login'); // Redirect if token refresh fails
        return;
      }
      const token = getIdToken();
      return getUserReports(token); // Pass token to API
    },
    enabled: true,
    retry: 1,
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    setSaveNetData(null);
  }, []);

  return (
    <>
      <article>
        <title>{`Dashboard | LifeRank`}</title>
        <meta name="description" content={`User dashboard`} />
      </article>
      <div className="relative flex flex-col min-h-screen w-full px-6 pb-6 pt-2">
        <div className="relative bg-white w-full lg:w-[764px] mx-auto pt-4">
          <TopLogo />
          <div className="mt-6">
            <AsyncStateWrapper
              isLoading={
                reportsIsLoading || reportsIsFetching || reportItemIsLoading || reportItemIsFetching
              }
              isError={reportsIsError || reportItemIsError}
              error={reportsError || reportItemError}
            >
              {reportId ? (
                <div className="py-4">
                  <ReportTable
                    report={reportItemData}
                    cityName={
                      reportsData?.find((item) => item.id === Number(reportId))?.city.name || ''
                    }
                  />
                </div>
              ) : (
                <>
                  {/* <Tabs
                    tabs={['Reports']}
                    activeTab={tab}
                    onTabClick={(tab: string) => setTab(tab)}
                  /> */}
                  <div className="py-4">
                    {tab === 'Reports' && (
                      <div>
                        <h2 className="text-xl text-gray-800 font-semibold text-center mb-6">
                          Your Income & Savings Reports
                        </h2>
                        <div className="flex justify-center mb-6 md:mb-8">
                          <Link
                            to="/europe?layerTypeId=1&centerLat=48.07649&centerLng=16.32731&north=58.40171&south=35.13787&east=40.73730&west=-8.04199&zoom=5&budget=7000&size=9007199254740991&sea=false&rank=false"
                            className="w-full block md:w-[300px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-6 rounded-lg transition-colors"
                          >
                            Go on the Map
                          </Link>{' '}
                        </div>

                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                          {reportsData?.map((item) => (
                            <ReportItem
                              data={item}
                              onClick={() => navigate(`?reportId=${item.id}`)}
                              key={item.id}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </AsyncStateWrapper>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
