import { useParams, useSearchParams } from 'react-router-dom';
import Switch from '../components/Budget/Switch';
import Slider from '../components/Budget/Slider';
import BudgetSelector from '../components/Budget/BudgetSelector';
import InputSection from '../components/Budget/InputSection';

function BudgetPlay() {
  const { name } = useParams();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  console.log(id);
  return (
    <div className="flex flex-col min-h-screen w-full px-2">
      <div className="sticky top-0 z-20 bg-white pb-4 pt-6 px-4 lg:px-0 flex flex-col w-full lg:w-[872px] mx-auto text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Budget Overview for {name}</h1>

        <p className="text-sm text-gray-600 mb-4">
          Explore how much life in <strong>{name}</strong> might cost. Choose your household type
          and customize your lifestyle using the controls below.
        </p>

        <BudgetSelector
          budgets={{
            solo: 1000,
            pair: 1000,
            family: 1000,
          }}
          onChange={(h) => console.log(h)}
        />
      </div>

      <div className="flex flex-col w-full lg:w-[922px] mx-auto text-center px-2">
        <InputSection
          name="Apartment Budget"
          description="Select your preferred living area to update your rent estimate"
        >
          <Switch
            options={['Central location', 'Outer areas']}
            onChange={(val) => console.log(val)}
          />
          <Switch
            options={['Smaller apartment', 'Bigger apartment']}
            onChange={(val) => console.log(val)}
          />
          <Switch
            options={['On the high end', 'On the lower end']}
            onChange={(val) => console.log(val)}
          />
        </InputSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputSection
            name="Food Budget"
            description="Adjust how often you eat out or order food instead of cooking at home"
          >
            <Slider
              options={['Low', 'Medium', 'High']}
              defaultValue={'Low'}
              color="gray"
              onChange={(i) => console.log('Selected step:', i)}
            />
          </InputSection>

          <InputSection
            name="Transport Budget"
            description="Set your preferred way of getting around — like using ride-hailing or public transport."
          >
            <Slider
              options={['Low', 'Medium', 'High']}
              defaultValue={'Low'}
              color="gray"
              onChange={(i) => console.log('Selected step:', i)}
            />
          </InputSection>

          <InputSection
            name="Going Out Budget"
            description="Choose how frequently you go out for drinks, entertainment, or nightlife."
          >
            <Slider
              options={['Low', 'Medium', 'High']}
              defaultValue={'Low'}
              color="gray"
              onChange={(i) => console.log('Selected step:', i)}
            />
          </InputSection>

          <InputSection
            name="Clothing Budget"
            description="Control how much you plan to spend on new clothes and fashion each month."
          >
            <Slider
              options={['Low', 'Medium', 'High']}
              defaultValue={'Low'}
              color="gray"
              onChange={(i) => console.log('Selected step:', i)}
            />
          </InputSection>
        </div>
      </div>
    </div>
  );
}

export default BudgetPlay;
