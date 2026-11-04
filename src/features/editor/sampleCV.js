// An example CV, in English or Khmer, for "Try an example CV".
// Every name, company, school and number here is made up for the example.
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
      nameKm: 'ឈ្មោះ គំរូ',
      nameLatin: 'Sample Name',
      headline: 'Accountant',
      gender: 'male',
      dateOfBirth: '1998-04-14',
      placeOfBirth: 'Phnom Penh',
      nationality: 'Cambodian',
      maritalStatus: 'single',
      phone: '012 000 000',
      email: 'name@example.com',
      address: 'Phnom Penh',
      salaryExpectation: '',
    },
    photo: '',
    summary:
      'Accountant with 3 years of experience in bookkeeping, tax filing and financial reporting. Careful and reliable. Looking for a role in a growing finance team.',
    experience: [
      {
        id: makeId(),
        jobTitle: 'Accountant',
        company: 'Sample Trading Co., Ltd.',
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
        company: 'Example Services Co., Ltd.',
        location: 'Phnom Penh',
        startDate: '2021-06',
        endDate: '2022-12',
        current: false,
        description: 'Recorded daily transactions in accounting software\nPrepared invoices and payment vouchers',
      },
    ],
    education: [
      {
        id: makeId(),
        institution: 'Sample University',
        degree: 'Bachelor of Accounting',
        gpa: '3.5',
        location: 'Phnom Penh',
        startDate: '2016-10',
        endDate: '2020-09',
        current: false,
      },
    ],
    certifications: [
      { id: makeId(), name: 'Bookkeeping Certificate', issuer: 'Sample Training Center', date: '2022-03' },
    ],
    languages: [
      { id: makeId(), language: 'Khmer', level: 'native' },
      { id: makeId(), language: 'English', level: 'fluent' },
      { id: makeId(), language: 'Chinese', level: 'basic' },
    ],
    references: [
      {
        id: makeId(),
        name: 'Sample Reference One',
        position: 'Finance Manager',
        organization: 'Sample Trading Co., Ltd.',
        contact: '011 000 000',
      },
      {
        id: makeId(),
        name: 'Sample Reference Two',
        position: 'Senior Lecturer',
        organization: 'Sample University',
        contact: '017 000 000',
      },
    ],
    skills: ['Microsoft Excel', 'Bookkeeping', 'Tax Filing', 'Financial Reporting', 'Teamwork'],
    hobbies: ['Reading', 'Football', 'Travelling'],
    links: ['linkedin.com/in/sample-name'],
  }
}

function sampleKhmer() {
  return {
    personal: {
      nameKm: 'ឈ្មោះ គំរូ',
      nameLatin: 'Sample Name',
      headline: 'គណនេយ្យករ',
      gender: 'male',
      dateOfBirth: '1998-04-14',
      placeOfBirth: 'រាជធានីភ្នំពេញ',
      nationality: 'ខ្មែរ',
      maritalStatus: 'single',
      phone: '012 000 000',
      email: 'name@example.com',
      address: 'រាជធានីភ្នំពេញ',
      salaryExpectation: '',
    },
    photo: '',
    summary:
      'គណនេយ្យករដែលមានបទពិសោធន៍ ៣ ឆ្នាំ ក្នុងការកត់ត្រាបញ្ជីគណនេយ្យ ការប្រកាសពន្ធ និងការរៀបចំរបាយការណ៍ហិរញ្ញវត្ថុ។ យកចិត្តទុកដាក់ និងអាចទុកចិត្តបាន។',
    experience: [
      {
        id: makeId(),
        jobTitle: 'គណនេយ្យករ',
        company: 'ក្រុមហ៊ុន ពាណិជ្ជកម្មគំរូ',
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
        company: 'ក្រុមហ៊ុន សេវាកម្មឧទាហរណ៍',
        location: 'ភ្នំពេញ',
        startDate: '2021-06',
        endDate: '2022-12',
        current: false,
        description: 'កត់ត្រាប្រតិបត្តិការប្រចាំថ្ងៃក្នុងកម្មវិធីគណនេយ្យ\nរៀបចំវិក្កយបត្រ និងប័ណ្ណទូទាត់',
      },
    ],
    education: [
      {
        id: makeId(),
        institution: 'សាកលវិទ្យាល័យគំរូ',
        degree: 'បរិញ្ញាបត្រគណនេយ្យ',
        gpa: '3.5',
        location: 'ភ្នំពេញ',
        startDate: '2016-10',
        endDate: '2020-09',
        current: false,
      },
    ],
    certifications: [
      { id: makeId(), name: 'វិញ្ញាបនបត្រកត់ត្រាបញ្ជី', issuer: 'មជ្ឈមណ្ឌលបណ្ដុះបណ្ដាលគំរូ', date: '2022-03' },
    ],
    languages: [
      { id: makeId(), language: 'ខ្មែរ', level: 'native' },
      { id: makeId(), language: 'អង់គ្លេស', level: 'fluent' },
      { id: makeId(), language: 'ចិន', level: 'basic' },
    ],
    references: [
      {
        id: makeId(),
        name: 'អ្នកយោងគំរូ ទី១',
        position: 'ប្រធានផ្នែកហិរញ្ញវត្ថុ',
        organization: 'ក្រុមហ៊ុន ពាណិជ្ជកម្មគំរូ',
        contact: '011 000 000',
      },
      {
        id: makeId(),
        name: 'អ្នកយោងគំរូ ទី២',
        position: 'សាស្ត្រាចារ្យ',
        organization: 'សាកលវិទ្យាល័យគំរូ',
        contact: '017 000 000',
      },
    ],
    skills: ['Microsoft Excel', 'ការកត់ត្រាបញ្ជី', 'ការប្រកាសពន្ធ', 'របាយការណ៍ហិរញ្ញវត្ថុ', 'ការងារជាក្រុម'],
    hobbies: ['អានសៀវភៅ', 'បាល់ទាត់', 'ធ្វើដំណើរកម្សាន្ត'],
    links: ['linkedin.com/in/sample-name'],
  }
}
