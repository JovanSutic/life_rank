interface Regions {
  name: string;
  region: string;
}

export const regionalWealthTaxDetails: Record<string, string> = {
  Andalusia:
    'Andalusia has a 100% tax bonus on the full tax liability. This effectively means no wealth tax is paid. However, this bonus is temporarily suspended for taxpayers who are liable for the national Solidarity Tax on Large Fortunes.',
  Catalonia:
    'Catalonia has its own progressive tax scale starting from 0.21% and reaching a top rate of 3.48% for wealth over €10,695,996.06. The minimum exemption is €500,000, and there are additional exemptions for family businesses and a €300,000 exemption for the primary residence. The tax is applied progressively, not as a single percentage on the total wealth.',
  'Valencian Community':
    'The Valencian Community applies its own progressive tax scale, with rates ranging from 0.25% to 3.5% for wealth above €10,695,996.06. The standard minimum exemption is €500,000.',
  Galicia:
    'Galicia applies a progressive tax scale with rates up to 3.5%. The minimum exemption is €700,000. It also offers specific deductions for assets such as rural land and historic properties, with some deductions reaching up to 100% on the portion of the tax corresponding to those assets.',
  Asturias:
    'Asturias applies the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. There are no specific regional bonuses or unique exemptions.',
  'Canary Islands':
    'The Canary Islands apply the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. There are no specific regional bonuses or unique exemptions.',
  Cantabria:
    "Cantabria has a 100% bonus, but it is only applicable to taxpayers with a net worth below €3,000,000 (after the €700,000 minimum exemption). If a taxpayer's net worth exceeds this limit, the bonus does not apply, and they must pay the tax according to the state scale.",
  'Castile and León':
    'Castile and León applies the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. It offers specific exemptions for protected assets of individuals with disabilities.',
  Navarre:
    "Navarre has its own tax scale, with a highest rate of 3.5%. The minimum exemption is €550,000, and a special exemption of up to €300,000 is available for a taxpayer's primary residence.",
  'Basque Country':
    'The Basque Country has a different tax scale, with a maximum rate of 2.5%. The minimum exemption is higher at €800,000, and the exemption for a primary residence is also higher at up to €400,000.',
  'Region of Murcia':
    'The Region of Murcia applies the state-level tax scale, which is progressive with a highest rate of 3.5%. The minimum exemption is €700,000. There are no specific regional bonuses or unique exemptions.',
  'Community of Madrid':
    'The Community of Madrid applies a 100% tax bonus, effectively eliminating the wealth tax. This bonus is temporary and is in effect for as long as the national Solidarity Tax on Large Fortunes is also in place.',
};

export const regionsSpain: Record<string, Regions> = {
  '231': { name: 'A Corunna', region: 'Galicia' },
  '224': { name: 'Alicante', region: 'Valencian Community' },
  '243': { name: 'Almeria', region: 'Andalusia' },
  '219': { name: 'Barcelona', region: 'Catalonia' },
  '221': { name: 'Bilbao', region: 'Basque Country' },
  '242': { name: 'Cadiz', region: 'Andalusia' },
  '235': { name: 'Cartagena', region: 'Region of Murcia' },
  '245': { name: 'Castellon de la Plana', region: 'Valencian Community' },
  '237': { name: 'Cordoba', region: 'Andalusia' },
  '229': { name: 'Gijon', region: 'Asturias' },
  '241': { name: 'Girona', region: 'Catalonia' },
  '236': { name: 'Granada', region: 'Andalusia' },
  '248': { name: 'Huelva', region: 'Andalusia' },
  '225': { name: 'Las Palmas', region: 'Canary Islands' },
  '218': { name: 'Madrid', region: 'Community of Madrid' },
  '222': { name: 'Malaga', region: 'Andalusia' },
  '244': { name: 'Marbella', region: 'Andalusia' },
  '226': { name: 'Murcia', region: 'Region of Murcia' },
  '228': { name: 'Oviedo', region: 'Asturias' },
  '234': { name: 'Palma de Mallorca', region: 'Balearic Islands' },
  '247': { name: 'Pamplona', region: 'Navarre' },
  '239': { name: 'Salamanca', region: 'Castile and León' },
  '232': { name: 'San Sebastian', region: 'Basque Country' },
  '246': { name: 'Santa Cruz de Tenerife', region: 'Canary Islands' },
  '230': { name: 'Santander', region: 'Cantabria' },
  '220': { name: 'Seville', region: 'Andalusia' },
  '240': { name: 'Tarragona', region: 'Catalonia' },
  '223': { name: 'Valencia', region: 'Valencian Community' },
  '238': { name: 'Valladolid', region: 'Castile and León' },
  '233': { name: 'Vigo', region: 'Galicia' },
};

export const mapCompass: Record<string, string> = {
  Spain:
    '/europe?layerTypeId=1&centerLat=40.67267&centerLng=-3.86719&north=47.59167&south=32.95377&east=10.89844&west=-18.63281&zoom=6&budget=7000&size=9007199254740991&sea=false&rank=false',
};
