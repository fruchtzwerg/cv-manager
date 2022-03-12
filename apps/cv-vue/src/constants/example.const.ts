import { ContentState } from '../models/store/v1.model';
import { VERSION } from '../constants/version.const';

export const example: ContentState = {
  version: VERSION,
  contactInfo: {
    heading: 'Contact',
    records: {
      web: 'jedipedia.fandom.com/wiki/Luke_Skywalker',
      mail: 'luke@skywalker.tat',
      phone: '+1 326-3827',
      address: ['Java Street 42', 'Anchorhead'],
    },
  },
  skills: [
    {
      id: 'a7150dca-2ebd-4145-96ab-bdcdbca66086',
      entries: [
        {
          id: '3874c620-f92e-4817-8686-3ef24ce00f29',
          active: true,
          value: 'Haggling',
        },
      ],
      active: true,
      heading: 'Top Skill',
    },
    {
      heading: 'Skills',
      entries: [
        {
          id: '748114fa-adb2-4468-a243-a5268671f164',
          active: true,
          value: 'Combat Piloting',
        },
        {
          id: '6d902415-0856-44c0-bf35-ee6d3928e4f6',
          active: true,
          value: 'Marksmanship',
        },
        {
          id: '36bcd2d1-a676-4c37-bbf9-8f5ffcf3215a',
          active: true,
          value: 'Stealth',
        },
        {
          id: '7caab32a-7525-4368-9569-4cb7fbb653e9',
          active: true,
          value: 'Mechanics',
        },
        {
          id: 'df452c05-7ef3-4761-b1fa-161d50cacf9f',
          active: true,
          value: 'Engineering',
        },
      ],
      id: 'f4534189-9dd8-40a5-9a6a-a5bcc608266b',
      active: true,
    },
    {
      heading: 'Languages',
      entries: [
        {
          active: true,
          value: 'Basic (fluent)',
          id: '80bd8361-dfb3-45ad-8629-27ac26f01c88',
        },
        {
          active: true,
          value: 'Wookiee (intermediate)',
          id: '4fa499e4-036b-4d90-a0b2-6553d7573bdd',
        },
        {
          id: '44548935-7265-41c0-821a-86d01fc59404',
          active: true,
          value: 'Beep-Boop (intermediate)',
        },
      ],
      id: '74270854-3759-4d55-af8c-88f6c8bbed26',
      active: true,
    },
  ],
  content: {
    sections: [
      {
        id: 'cecd1ce9-6133-4249-9dc5-9a54199426d2',
        heading: 'Luke Skywalker',
        active: true,
        pagebreak: false,
        parts: [
          {
            id: '845e61c1-bb77-4f39-8198-587cdf98acdd',
            active: true,
            pagebreak: false,
            heading: 'Moisture farmer on Tatooine',
            title: 'May the force be with you',
            text: "<p>Hi, I'm Luke Skywalker and I would like to apply for the galactic rebellion.</p><p>Since early childhood I have always been a rebel by nature.</p><p>As a five-year-old I used to climb on top of the moisture vaporators on my uncle's farm despite his protests.</p><p>I am proficient in sabotage and subterfuge: My aunt never knew who took the cookies out of the jar - to this day she blames the neighbouring Javas due to the evidence I planted.</p><p>As an accomplished bush pilot I will have no trouble with the X-Wing and will be an ace in no time.</p><p>Considering that I hold the record in womp rat kills I also know how to handle myself in a firefight.</p><p>I am excited to explore the galaxy with my fellow rebel scum.</p>",
            caption: 'Mechanic | Pilot | Adventurer | Rebel Scum',
          },
        ],
      },
      {
        id: '82f562f6-4681-4645-a850-aaa2fd960f89',
        heading: 'Experience',
        active: true,
        pagebreak: true,
        parts: [
          {
            id: '0f5d0012-f66e-488b-b0b7-82cced9b6895',
            active: true,
            pagebreak: false,
            heading: 'Mos Eisley Womptastic Tournement',
            title: 'Champion',
            caption: 'Accuracy | Speed | Overall',
            subtitle: '3 years in a row',
            href: 'womptastic.tat',
            text: '<p>Incumbent champion in the following disciplines:</p><ul><li>Precision - most kills with 30 rounds</li><li>Speed - most kills in 30 seconds</li><li>Overall</li></ul>',
          },
          {
            id: '9ffce360-e59a-4235-b0d0-d67f0dc465c4',
            active: true,
            pagebreak: false,
            heading: 'Droid Repairs',
            title: 'Mechanic',
            caption: 'Astromech | Protocol | Multi-Purpose',
            subtitle: '1 year',
            text: '<p>In my function as the on-call farm mechanic I have repaired, maintained and modified any class of droid one can think of. From Astromech to Protocol droids - I know them all.</p><p>Extensive experience with getting breaking equipment to work, even with an extreme lack of supplies.</p>',
          },
          {
            id: 'f1ba7d7b-0875-44a2-aaa9-4bbeb0748c7b',
            active: true,
            pagebreak: false,
            heading: 'Deliveries',
            title: 'Speeder Pilot',
            caption: 'X-34 Landspeeder',
            subtitle: '2 years',
            text: '<p>Experience with loading and delivering goods with the trusty X-34 Landspeeder in traitorous terrain.</p><p>Evasion of Tusken Raiders and Javas alike.</p><p>Defence of cargo during high speed desert persuits.</p>',
            href: 'www.starwars.com/databank/x-34-landspeeder',
          },
        ],
      },
      {
        id: '55f374c7-13ca-48c5-b183-0734f910bb46',
        heading: 'CV',
        active: true,
        pagebreak: true,
        parts: [
          {
            id: '550144bf-82fd-4b01-ad3d-e76e1f93c3be',
            active: true,
            pagebreak: false,
            title: 'Lars Moisture Farm',
            caption: 'Moisture farmer',
            subtitle: '35 VSY - today',
            text: '<p>Responsible for cleaning and maintaining moisture vaporators as well as droid procurement and repairs.</p>',
          },
          {
            id: '56b58a5f-28cc-4a51-8273-e2fc2426fa58',
            active: true,
            pagebreak: false,
            title: 'Anchorhead High',
            caption: 'Student',
            subtitle: '35 VSY',
            text: '<p>Played offense for the <span style="color: rgb(26, 26, 27);">Anchorhead Tusken Raiders.</span></p><p>Grade: 2.4</p>',
          },
        ],
      },
    ],
  },
  style: {
    colors: {
      primary: '#282960',
      'primary-text': '#ffffff',
      heading: '#4547a9',
      title: '#4547a9',
      caption: '#282960',
      subtitle: '#8183f4',
      href: '#8183f4',
    },
    sidebar: { width: 'min-content', background: '#540d10', color: 'white' },
  },
};
