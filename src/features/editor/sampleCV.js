// An example CV, in English or Khmer, for "Try an example CV".
import { emptyDocument } from '../storage/schema.js'
import { makeId } from '../../shared/ids.js'

export function sampleDocument(lang) {
  const doc = emptyDocument(lang)
  doc.cv = lang === 'km' ? sampleKhmer() : sampleEnglish()
  return doc
}

function sampleEnglish() {
  return {
    personal: {
      nameKm: 'សុខ ដារា',
      nameLatin: 'Sok Dara',
      headline: 'Accountant',
      gender: 'male',
      dateOfBirth: '1998-04-14',
      placeOfBirth: 'Kampong Cham',
      nationality: 'Cambodian',
      maritalStatus: 'single',
      phone: '012 345 678',
      email: 'sok.dara@example.com',
      address: 'Sen Sok, Phnom Penh',
      salaryExpectation: '',
    },
    photo: '',
    summary:
      'Accountant with 3 years of experience in bookkeeping, tax filing and financial reporting. Careful and reliable. Looking for a role in a growing finance team.',
    experience: [
      {
        id: makeId(),
        jobTitle: 'Accountant',
        company: 'ABC Trading Co., Ltd.',
        location: 'Phnom Penh',
        startDate: '2023-01',
        endDate: '',
        current: true,
        description:
          'Prepared monthly financial reports\nFiled monthly and annual tax returns\nReconciled bank accounts and petty cash',
      },
      {
        id: makeId(),
        jobTitle: 'Junior Accountant',
        company: 'Mekong Services',
        location: 'Phnom Penh',
        startDate: '2021-06',
        endDate: '2022-12',
        current: false,
        description: 'Recorded daily transactions in QuickBooks\nPrepared invoices and payment vouchers',
      },
    ],
    education: [
      {
        id: makeId(),
        institution: 'National University of Management',
        degree: 'Bachelor of Accounting',
        gpa: '3.5',
        location: 'Phnom Penh',
        startDate: '2016-10',
        endDate: '2020-09',
        current: false,
      },
    ],
    certifications: [{ id: makeId(), name: 'QuickBooks Certification', issuer: 'Intuit', date: '2022-03' }],
    languages: [
      { id: makeId(), language: 'Khmer', level: 'native' },
      { id: makeId(), language: 'English', level: 'fluent' },
      { id: makeId(), language: 'Chinese', level: 'basic' },
    ],
    references: [
      {
        id: makeId(),
        name: 'Chan Sophea',
        position: 'Finance Manager',
        organization: 'ABC Trading Co., Ltd.',
        contact: '011 222 333',
      },
      {
        id: makeId(),
        name: 'Lim Vuthy',
        position: 'Senior Lecturer',
        organization: 'National University of Management',
        contact: '017 888 999',
      },
    ],
    skills: ['Microsoft Excel', 'QuickBooks', 'Tax Filing', 'Financial Reporting', 'Teamwork'],
    hobbies: ['Reading', 'Football', 'Travelling'],
    links: ['linkedin.com/in/sokdara'],
  }
}

function sampleKhmer() {
  return {
    personal: {
      nameKm: 'សុខ ដារា',
      nameLatin: 'Sok Dara',
      headline: 'គណនេយ្យករ',
      gender: 'male',
      dateOfBirth: '1998-04-14',
      placeOfBirth: 'ខេត្តកំពង់ចាម',
      nationality: 'ខ្មែរ',
      maritalStatus: 'single',
      phone: '012 345 678',
      email: 'sok.dara@example.com',
      address: 'ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ',
      salaryExpectation: '',
    },
    photo: '',
    summary:
      'គណនេយ្យករដែលមានបទពិសោធន៍ ៣ ឆ្នាំ ក្នុងការកត់ត្រាបញ្ជីគណនេយ្យ ការប្រកាសពន្ធ និងការរៀបចំរបាយការណ៍ហិរញ្ញវត្ថុ។ យកចិត្តទុកដាក់ និងអាចទុកចិត្តបាន។',
    experience: [
      {
        id: makeId(),
        jobTitle: 'គណនេយ្យករ',
        company: 'ក្រុមហ៊ុន ABC Trading',
        location: 'ភ្នំពេញ',
        startDate: '2023-01',
        endDate: '',
        current: true,
        description:
          'រៀបចំរបាយការណ៍ហិរញ្ញវត្ថុប្រចាំខែ\nប្រកាសពន្ធប្រចាំខែ និងប្រចាំឆ្នាំ\nផ្ទៀងផ្ទាត់គណនីធនាគារ និងសាច់ប្រាក់',
      },
      {
        id: makeId(),
        jobTitle: 'ជំនួយការគណនេយ្យ',
        company: 'ក្រុមហ៊ុន Mekong Services',
        location: 'ភ្នំពេញ',
        startDate: '2021-06',
        endDate: '2022-12',
        current: false,
        description: 'កត់ត្រាប្រតិបត្តិការប្រចាំថ្ងៃក្នុង QuickBooks\nរៀបចំវិក្កយបត្រ និងប័ណ្ណទូទាត់',
      },
    ],
    education: [
      {
        id: makeId(),
        institution: 'សាកលវិទ្យាល័យជាតិគ្រប់គ្រង',
        degree: 'បរិញ្ញាបត្រគណនេយ្យ',
        gpa: '3.5',
        location: 'ភ្នំពេញ',
        startDate: '2016-10',
        endDate: '2020-09',
        current: false,
      },
    ],
    certifications: [{ id: makeId(), name: 'វិញ្ញាបនបត្រ QuickBooks', issuer: 'Intuit', date: '2022-03' }],
    languages: [
      { id: makeId(), language: 'ខ្មែរ', level: 'native' },
      { id: makeId(), language: 'អង់គ្លេស', level: 'fluent' },
      { id: makeId(), language: 'ចិន', level: 'basic' },
    ],
    references: [
      {
        id: makeId(),
        name: 'ចាន់ សោភា',
        position: 'ប្រធានផ្នែកហិរញ្ញវត្ថុ',
        organization: 'ក្រុមហ៊ុន ABC Trading',
        contact: '011 222 333',
      },
      {
        id: makeId(),
        name: 'លឹម វុទ្ធី',
        position: 'សាស្ត្រាចារ្យ',
        organization: 'សាកលវិទ្យាល័យជាតិគ្រប់គ្រង',
        contact: '017 888 999',
      },
    ],
    skills: ['Microsoft Excel', 'QuickBooks', 'ការប្រកាសពន្ធ', 'របាយការណ៍ហិរញ្ញវត្ថុ', 'ការងារជាក្រុម'],
    hobbies: ['អានសៀវភៅ', 'បាល់ទាត់', 'ធ្វើដំណើរកម្សាន្ត'],
    links: ['linkedin.com/in/sokdara'],
  }
}
