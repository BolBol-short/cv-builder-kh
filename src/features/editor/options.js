// Suggestion lists, one per CV language. A chosen suggestion goes straight into
// the CV text, so it must be in the language the CV is written in.

export const SKILL_OPTIONS = {
  en: [
    'Microsoft Office',
    'Microsoft Excel',
    'Accounting',
    'Customer Service',
    'Communication',
    'Teamwork',
    'Leadership',
    'Problem Solving',
    'Time Management',
    'Sales',
    'Marketing',
    'Data Entry',
    'Graphic Design',
    'Programming',
    'Project Management',
    'Public Speaking',
  ],
  km: [
    'Microsoft Office',
    'Microsoft Excel',
    'គណនេយ្យ',
    'សេវាបម្រើអតិថិជន',
    'ការទំនាក់ទំនង',
    'ការងារជាក្រុម',
    'ភាពជាអ្នកដឹកនាំ',
    'ការដោះស្រាយបញ្ហា',
    'ការគ្រប់គ្រងពេលវេលា',
    'ការលក់',
    'ទីផ្សារ',
    'ការបញ្ចូលទិន្នន័យ',
    'ការរចនាក្រាហ្វិក',
    'ការសរសេរកម្មវិធី',
    'ការគ្រប់គ្រងគម្រោង',
    'ការនិយាយជាសាធារណៈ',
  ],
}

export const HOBBY_OPTIONS = {
  en: [
    'Reading',
    'Travelling',
    'Music',
    'Sports',
    'Football',
    'Cooking',
    'Photography',
    'Volunteering',
    'Learning languages',
  ],
  km: [
    'អានសៀវភៅ',
    'ធ្វើដំណើរកម្សាន្ត',
    'តន្ត្រី',
    'កីឡា',
    'បាល់ទាត់',
    'ធ្វើម្ហូប',
    'ថតរូប',
    'ការងារស្ម័គ្រចិត្ត',
    'រៀនភាសា',
  ],
}

export const LANGUAGE_OPTIONS = {
  en: ['Khmer', 'English', 'Chinese', 'Thai', 'Vietnamese', 'French', 'Japanese', 'Korean'],
  km: ['ខ្មែរ', 'អង់គ្លេស', 'ចិន', 'ថៃ', 'វៀតណាម', 'បារាំង', 'ជប៉ុន', 'កូរ៉េ'],
}

export const NATIONALITY_OPTIONS = {
  en: ['Cambodian'],
  km: ['ខ្មែរ'],
}

// These are stored as codes and translated when shown.
export const GENDERS = ['female', 'male', 'other']
export const MARITAL_STATUSES = ['single', 'married', 'divorced', 'widowed']
export const LANGUAGE_LEVELS = ['native', 'fluent', 'advanced', 'intermediate', 'basic']

// Colors the user can pick for their CV (one color per CV).
export const ACCENT_PRESETS = [
  '#1d4ed8', // blue
  '#1e3a8a', // navy
  '#0f766e', // teal
  '#15803d', // green
  '#a16207', // gold
  '#b91c1c', // red
  '#7e22ce', // purple
  '#1c1917', // black
]
