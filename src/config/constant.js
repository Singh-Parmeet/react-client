import { getFormattedDate } from '../helpers/helpers';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = '/images/default.png';

export const BANNERS = [
  'cloud.jpg',
  'js.jpg',
  'load-balancer.png',
  'full-stack-web-development.jpg',
  'dns-server.png',
];

export const DROPDOWN_OPTIONS = [
  {
    label: 'FOOTBALL',
    value: 'football',
  },
  {
    label: 'CRICKET',
    value: 'cricket',
  },
];

export const FOOTBALL_OPTIONS = [
  {
    label: 'Defender',
    value: 'defender',
  },
  {
    label: 'Striker',
    value: 'striker',
  },
];

export const CRICKET_OPTIONS = [
  {
    label: 'Wicket Keeper',
    value: 'wicket keeper',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'All Rounder',
    value: 'all rounder',
  },
];

export const ERRORS = {
  textField: {
    error: 'Name is reqiured',
    lengthError: 'Name must be atleast 3 characters long',
  },
  dropDown: {
    error: 'Select atleast one sport',
  },
  radio: {
    error: 'Select What you do?',
  },
};

export const Columns = [{
  field: 'title',
  label: 'TITLE',
},
{
  field: 'description',
  label: 'DESCRIPTION',
  // format: (value) => value && value.toUpperCase(),
},
{
  field: 'status',
  label: 'Status',
  // format: (value) => value && value.toUpperCase(),
},
{
  field: 'createdAt',
  label: 'Date',
  align: 'right',
  format: getFormattedDate,
},
];
