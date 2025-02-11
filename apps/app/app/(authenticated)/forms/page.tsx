import { FormPresenterDashboard } from '@/features/forms/components/dashboards/form-presenter.dashboard';
import type { FormStepperStep } from '@/features/forms/components/form-stepper';

const steps = [
  {
    id: 'step-1',
    title: 'Personal Information',
    description: 'Please provide your personal information',
    buttonLabel: 'Next',
    fields: [
      {
        id: 'name',
        title: 'Name',
        description: 'Please provide your name',
        required: true,
        attributes: {
          type: 'text',
        },
      },
      {
        id: 'email',
        title: 'Email',
        description: 'Please provide your email',
        required: true,
        attributes: {
          type: 'text',
        },
      },
      {
        id: 'phone',
        title: 'Phone',
        description: 'Please provide your phone',
        required: true,
        attributes: {
          type: 'text',
        },
      },
      {
        id: 'date-of-birth',
        title: 'Date of Birth',
        description: 'Please provide your date of birth',
        required: true,
        attributes: {
          type: 'date',
        },
      },
      {
        id: 'address',
        title: 'Address',
        description: 'Please provide your address',
        required: true,
        attributes: {
          type: 'text',
        },
      },
      {
        id: 'city',
        title: 'City',
        description: 'Please provide your city',
        required: true,
        attributes: {
          type: 'text',
        },
      },
      {
        id: 'state',
        title: 'State',
        description: 'What state do you live in?',
        required: true,
        attributes: {
          type: 'select',
          options: [
            { value: 'alabama', label: 'Alabama' },
            { value: 'alaska', label: 'Alaska' },
            { value: 'arizona', label: 'Arizona' },
            { value: 'arkansas', label: 'Arkansas' },
            { value: 'california', label: 'California' },
            { value: 'colorado', label: 'Colorado' },
            { value: 'connecticut', label: 'Connecticut' },
            { value: 'delaware', label: 'Delaware' },
            { value: 'florida', label: 'Florida' },
            { value: 'georgia', label: 'Georgia' },
            { value: 'hawaii', label: 'Hawaii' },
            { value: 'idaho', label: 'Idaho' },
            { value: 'illinois', label: 'Illinois' },
            { value: 'indiana', label: 'Indiana' },
            { value: 'iowa', label: 'Iowa' },
            { value: 'kansas', label: 'Kansas' },
            { value: 'kentucky', label: 'Kentucky' },
            { value: 'louisiana', label: 'Louisiana' },
            { value: 'maine', label: 'Maine' },
            { value: 'maryland', label: 'Maryland' },
            { value: 'massachusetts', label: 'Massachusetts' },
            { value: 'michigan', label: 'Michigan' },
            { value: 'minnesota', label: 'Minnesota' },
            { value: 'mississippi', label: 'Mississippi' },
            { value: 'missouri', label: 'Missouri' },
            { value: 'montana', label: 'Montana' },
            { value: 'nebraska', label: 'Nebraska' },
            { value: 'nevada', label: 'Nevada' },
            { value: 'new-hampshire', label: 'New Hampshire' },
            { value: 'new-jersey', label: 'New Jersey' },
            { value: 'new-mexico', label: 'New Mexico' },
            { value: 'new-york', label: 'New York' },
            { value: 'north-carolina', label: 'North Carolina' },
            { value: 'north-dakota', label: 'North Dakota' },
            { value: 'ohio', label: 'Ohio' },
            { value: 'oklahoma', label: 'Oklahoma' },
            { value: 'oregon', label: 'Oregon' },
            { value: 'pennsylvania', label: 'Pennsylvania' },
            { value: 'rhode-island', label: 'Rhode Island' },
            { value: 'south-carolina', label: 'South Carolina' },
            { value: 'south-dakota', label: 'South Dakota' },
            { value: 'tennessee', label: 'Tennessee' },
            { value: 'texas', label: 'Texas' },
            { value: 'utah', label: 'Utah' },
            { value: 'vermont', label: 'Vermont' },
            { value: 'virginia', label: 'Virginia' },
            { value: 'washington', label: 'Washington' },
            { value: 'west-virginia', label: 'West Virginia' },
            { value: 'wisconsin', label: 'Wisconsin' },
            { value: 'wyoming', label: 'Wyoming' },
            { value: 'district-of-columbia', label: 'District of Columbia' },
          ],
        },
      },
      {
        id: 'zip',
        title: 'Zip',
        description: 'Please provide your zip',
        required: true,
        attributes: {
          type: 'text',
        },
      },
      {
        id: 'driver-license',
        title: "Driver's License #",
        description: "Today's date",
        required: true,
        attributes: {
          type: 'text',
        },
      },
    ],
  },
  {
    id: 'step-2',
    title: 'Background Information',
    description: 'Please provide your background information',
    buttonLabel: 'Submit',
    fields: [
      {
        id: 'married',
        title: 'Are you married?',
        description: "Please indicate if you're married",
        required: true,
        attributes: {
          type: 'radio',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      },
    ],
  },
] satisfies FormStepperStep[];

export default function OnboardingMentorPage() {
  return (
    <FormPresenterDashboard
      formTitle={'Mentor Sign Up Form'}
      formSteps={steps}
    />
  );
}
