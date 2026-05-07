// Backend integration point: replace all mock data with API calls

export type Brand = {
  id: string;
  name: string;
  color: string;
  logoUrl?: string;
};

export type Customer = {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  address3?: string;
  city: string;
  postcode: string;
  country: string;
  nzbn?: string;
  totalSpend: number;
  jobCount: number;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  postcode: string;
  country: string;
};

export type LabourType = {
  id: string;
  name: string;
  ratePerHour: number;
  costPerHour: number;
};

export type StockItem = {
  id: string;
  code: string;
  name: string;
  description: string;
  categoryId: string;
  brandId: string;
  supplierId: string;
  supplier2Id?: string;
  unitCost: number;
  unitCost2?: number;
  sellPrice: number;
  markupPercent: number;
  gstIncluded: boolean;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  location: string;
  imageUrl?: string;
};

export type BOMItem = {
  stockItemId: string;
  quantity: number;
  unit: string;
};

export type StockProduct = {
  id: string;
  code: string;
  name: string;
  description: string;
  brandId: string;
  categoryId: string;
  bom: BOMItem[];
  labourMinutes: number;
  labourTypeId: string;
  costPrice: number;
  sellPrice: number;
  markupPercent: number;
  gstIncluded: boolean;
  imageUrl?: string;
  stepFileUrl?: string;
  quantity: number;
};

export type JobSection = {
  id: string;
  name: string;
  lineItems: LineItem[];
};

export type LineItem = {
  id: string;
  type: 'stock_item' | 'stock_product' | 'labour' | 'manual';
  refId?: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  markupPercent: number;
  discountPercent: number;
  gstIncluded: boolean;
  total: number;
};

export type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
};

export type Job = {
  id: string;
  jobNumber: string;
  customerId: string;
  brandId: string;
  title: string;
  description: string;
  status: 'draft' | 'in_progress' | 'completed' | 'invoiced' | 'archived' | 'internal';
  quoteStatus: 'none' | 'draft' | 'sent' | 'accepted' | 'declined';
  designStatus: 'none' | 'in_progress' | 'completed';
  depositRequired: boolean;
  depositAmount: number;
  depositPaid: boolean;
  isCash: boolean;
  isInternal: boolean;
  checklist: ChecklistItem[];
  checklistDisabled: boolean;
  sections: JobSection[];
  lineItems: LineItem[];
  linkedPOIds: string[];
  invoiceId?: string;
  quoteId?: string;
  assignedDate: string;
  dueDate: string;
  notes: string;
  markupPercent: number;
  discountPercent: number;
  atCostPrice: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  supplierId: string;
  brandId: string;
  jobId?: string;
  status: 'draft' | 'sent' | 'partial' | 'received' | 'cancelled';
  lineItems: POLineItem[];
  subtotal: number;
  gstAmount: number;
  total: number;
  notes: string;
  receivedDate?: string;
  documentUrl?: string;
  createdAt: string;
  dueDate: string;
};

export type POLineItem = {
  id: string;
  stockItemId?: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  jobId?: string;
  received: boolean;
  receivedQty: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  brandId: string;
  jobId?: string;
  quoteId?: string;
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue' | 'void';
  isCash: boolean;
  lineItems: LineItem[];
  sections: InvoiceSection[];
  linkedPOIds: string[];
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  markupPercent: number;
  depositAmount: number;
  depositPaid: boolean;
  gstAmount: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  notes: string;
  terms: string;
  issueDate: string;
  dueDate: string;
  atCostPrice: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceSection = {
  id: string;
  name: string;
  lineItems: LineItem[];
};

export type CalendarNote = {
  id: string;
  date: string;
  title: string;
  note: string;
  brandId?: string;
  jobId?: string;
  isInternal: boolean;
  type: 'note' | 'job' | 'production';
};

// ─── BRANDS ───────────────────────────────────────────────────────────────────
export const BRANDS: Brand[] = [
  { id: 'brand-001', name: 'IronEdge', color: '#7c3aed' },
  { id: 'brand-002', name: 'SteelForm', color: '#2563eb' },
  { id: 'brand-003', name: 'TrailTek', color: '#16a34a' },
  { id: 'brand-004', name: 'CoreFab', color: '#ca8a04' },
];

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
export const CUSTOMERS: Customer[] = [
  {
    id: 'cust-001', name: 'Liam Tanner', company: 'Tanner Contracting Ltd',
    email: 'liam@tannercontracting.co.nz', phone: '027 345 6789',
    address1: '14 Rata Street', city: 'Hamilton', postcode: '3204',
    country: 'New Zealand', nzbn: '9429046123456', totalSpend: 24850, jobCount: 7,
  },
  {
    id: 'cust-002', name: 'Sophie Ngata', company: 'Ngata Builds',
    email: 'sophie@ngatabuilds.co.nz', phone: '021 987 6543',
    address1: '8 Kahikatea Drive', city: 'Auckland', postcode: '1010',
    country: 'New Zealand', nzbn: '9429046234567', totalSpend: 41200, jobCount: 12,
  },
  {
    id: 'cust-003', name: 'Marcus Reid', company: '',
    email: 'marcusreid@gmail.com', phone: '022 111 2233',
    address1: '22 Pohutukawa Ave', city: 'Tauranga', postcode: '3110',
    country: 'New Zealand', totalSpend: 8900, jobCount: 3,
  },
  {
    id: 'cust-004', name: 'Aroha Parata', company: 'Parata Engineering',
    email: 'aroha@parataeng.co.nz', phone: '027 555 0001',
    address1: '5 Steel Road', city: 'Palmerston North', postcode: '4410',
    country: 'New Zealand', nzbn: '9429046345678', totalSpend: 67400, jobCount: 18,
  },
  {
    id: 'cust-005', name: 'Dean Hollis', company: 'Hollis Motorsport',
    email: 'dean@hollismotorsport.co.nz', phone: '021 444 5566',
    address1: '101 Workshop Lane', city: 'Christchurch', postcode: '8011',
    country: 'New Zealand', nzbn: '9429046456789', totalSpend: 19750, jobCount: 5,
  },
];

// ─── SUPPLIERS ────────────────────────────────────────────────────────────────
export const SUPPLIERS: Supplier[] = [
  {
    id: 'sup-001', name: 'MetalMart NZ', contact: 'Craig Fowler',
    email: 'orders@metalmart.co.nz', phone: '07 838 1122',
    address1: '33 Industrial Way', city: 'Hamilton', postcode: '3200', country: 'New Zealand',
  },
  {
    id: 'sup-002', name: 'Southern Steel', contact: 'Tracey Bloom',
    email: 'sales@southernsteel.co.nz', phone: '03 365 4400',
    address1: '77 Fabrication Rd', city: 'Christchurch', postcode: '8053', country: 'New Zealand',
  },
  {
    id: 'sup-003', name: 'Fastener King', contact: 'Ben Okafor',
    email: 'ben@fastenerking.co.nz', phone: '09 271 5500',
    address1: '12 Bolt Street', city: 'Auckland', postcode: '1060', country: 'New Zealand',
  },
  {
    id: 'sup-004', name: 'PaintPro Supplies', contact: 'Lisa Yuen',
    email: 'lisa@paintpro.co.nz', phone: '04 499 3300',
    address1: '28 Colour Court', city: 'Wellington', postcode: '6011', country: 'New Zealand',
  },
];

// ─── LABOUR TYPES ─────────────────────────────────────────────────────────────
export const LABOUR_TYPES: LabourType[] = [
  { id: 'lab-001', name: 'Fabrication', ratePerHour: 120, costPerHour: 55 },
  { id: 'lab-002', name: 'Welding', ratePerHour: 135, costPerHour: 60 },
  { id: 'lab-003', name: 'Design & Engineering', ratePerHour: 150, costPerHour: 70 },
  { id: 'lab-004', name: 'Painting & Finishing', ratePerHour: 95, costPerHour: 45 },
  { id: 'lab-005', name: 'Installation', ratePerHour: 110, costPerHour: 50 },
  { id: 'lab-006', name: 'Project Management', ratePerHour: 160, costPerHour: 80 },
];

// ─── STOCK ITEMS ──────────────────────────────────────────────────────────────
export const STOCK_ITEMS: StockItem[] = [
  {
    id: 'si-001', code: 'STL-RHS-50x50', name: '50x50 RHS Steel Section',
    description: 'Rectangular hollow section 50x50x3mm steel', categoryId: 'cat-001',
    brandId: 'brand-001', supplierId: 'sup-001', unitCost: 28.50, sellPrice: 42.00,
    markupPercent: 47.4, gstIncluded: false, quantity: 45, unit: 'm', lowStockThreshold: 10, location: 'Rack A1',
  },
  {
    id: 'si-002', code: 'STL-PLATE-6', name: '6mm Steel Plate',
    description: 'Hot rolled steel plate 6mm thick, 2400x1200mm sheet', categoryId: 'cat-001',
    brandId: 'brand-001', supplierId: 'sup-001', supplier2Id: 'sup-002', unitCost: 185.00, unitCost2: 178.00, sellPrice: 260.00,
    markupPercent: 40.5, gstIncluded: false, quantity: 12, unit: 'sheet', lowStockThreshold: 3, location: 'Floor B',
  },
  {
    id: 'si-003', code: 'BOLT-M12-100', name: 'M12x100 Hex Bolt Grade 8.8',
    description: 'High tensile hex bolt M12 x 100mm zinc plated', categoryId: 'cat-002',
    brandId: 'brand-002', supplierId: 'sup-003', unitCost: 1.85, sellPrice: 3.20,
    markupPercent: 73.0, gstIncluded: false, quantity: 320, unit: 'ea', lowStockThreshold: 50, location: 'Bin C3',
  },
  {
    id: 'si-004', code: 'PAINT-PRIMER-4L', name: 'Etch Primer 4L',
    description: 'Two-pack etch primer for steel, grey', categoryId: 'cat-003',
    brandId: 'brand-004', supplierId: 'sup-004', unitCost: 62.00, sellPrice: 95.00,
    markupPercent: 53.2, gstIncluded: false, quantity: 8, unit: 'tin', lowStockThreshold: 2, location: 'Paint Store',
  },
  {
    id: 'si-005', code: 'STL-ANGLE-40x40', name: '40x40 Angle Iron',
    description: 'Equal angle iron 40x40x4mm', categoryId: 'cat-001',
    brandId: 'brand-003', supplierId: 'sup-001', unitCost: 18.20, sellPrice: 27.00,
    markupPercent: 48.4, gstIncluded: false, quantity: 3, unit: 'm', lowStockThreshold: 8, location: 'Rack A2',
  },
  {
    id: 'si-006', code: 'WELD-WIRE-0.9', name: 'MIG Wire 0.9mm 15kg',
    description: 'ER70S-6 mild steel MIG welding wire 0.9mm 15kg spool', categoryId: 'cat-004',
    brandId: 'brand-001', supplierId: 'sup-002', unitCost: 89.00, sellPrice: 125.00,
    markupPercent: 40.4, gstIncluded: false, quantity: 6, unit: 'spool', lowStockThreshold: 2, location: 'Weld Bay',
  },
];

// ─── STOCK PRODUCTS ───────────────────────────────────────────────────────────
export const STOCK_PRODUCTS: StockProduct[] = [
  {
    id: 'sp-001', code: 'IE-CHASSIS-01', name: 'IronEdge Trailer Chassis 6x4',
    description: 'Heavy duty 6x4 trailer chassis fabricated from RHS steel', brandId: 'brand-001',
    categoryId: 'cat-prod-001',
    bom: [
      { stockItemId: 'si-001', quantity: 24, unit: 'm' },
      { stockItemId: 'si-002', quantity: 2, unit: 'sheet' },
      { stockItemId: 'si-003', quantity: 24, unit: 'ea' },
    ],
    labourMinutes: 480, labourTypeId: 'lab-002',
    costPrice: 1284.00, sellPrice: 2200.00, markupPercent: 71.3,
    gstIncluded: false, quantity: 3,
  },
  {
    id: 'sp-002', code: 'SF-BRACKET-HD', name: 'SteelForm Heavy Duty Bracket',
    description: 'Laser cut and folded heavy duty mounting bracket', brandId: 'brand-002',
    categoryId: 'cat-prod-002',
    bom: [
      { stockItemId: 'si-002', quantity: 0.25, unit: 'sheet' },
      { stockItemId: 'si-003', quantity: 4, unit: 'ea' },
    ],
    labourMinutes: 45, labourTypeId: 'lab-001',
    costPrice: 54.25, sellPrice: 95.00, markupPercent: 75.0,
    gstIncluded: false, quantity: 18,
  },
  {
    id: 'sp-003', code: 'TT-MUDGUARD-SET', name: 'TrailTek Mudguard Set',
    description: 'Pressed steel mudguard set, pair, powder coated black', brandId: 'brand-003',
    categoryId: 'cat-prod-003',
    bom: [
      { stockItemId: 'si-002', quantity: 0.5, unit: 'sheet' },
      { stockItemId: 'si-004', quantity: 0.5, unit: 'tin' },
    ],
    labourMinutes: 90, labourTypeId: 'lab-004',
    costPrice: 123.50, sellPrice: 220.00, markupPercent: 78.1,
    gstIncluded: false, quantity: 7,
  },
];

// ─── JOBS ─────────────────────────────────────────────────────────────────────
export const JOBS: Job[] = [
  {
    id: 'job-001', jobNumber: 'JOB-0112', customerId: 'cust-002', brandId: 'brand-001',
    title: 'Custom Trailer Build — 7x5 Tandem', description: 'Full custom tandem axle trailer with ramp gate and toolbox',
    status: 'in_progress', quoteStatus: 'accepted', designStatus: 'completed',
    depositRequired: true, depositAmount: 800, depositPaid: true,
    isCash: false, isInternal: false,
    checklist: [
      { id: 'cl-001', label: 'Design Made', checked: true },
      { id: 'cl-002', label: 'Quote Sent', checked: true },
      { id: 'cl-003', label: 'Quote Accepted', checked: true },
      { id: 'cl-004', label: 'Deposit Received', checked: true },
      { id: 'cl-005', label: 'Materials Ordered', checked: true },
      { id: 'cl-006', label: 'Production Started', checked: true },
      { id: 'cl-007', label: 'Quality Check', checked: false },
      { id: 'cl-008', label: 'Invoice Sent', checked: false },
    ],
    checklistDisabled: false,
    sections: [
      {
        id: 'sec-001', name: 'Chassis',
        lineItems: [
          { id: 'li-001', type: 'stock_item', refId: 'si-001', description: '50x50 RHS Steel Section', quantity: 24, unit: 'm', unitPrice: 42.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1008.00 },
          { id: 'li-002', type: 'stock_item', refId: 'si-002', description: '6mm Steel Plate', quantity: 2, unit: 'sheet', unitPrice: 260.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 520.00 },
        ],
      },
      {
        id: 'sec-002', name: 'Mudguards',
        lineItems: [
          { id: 'li-003', type: 'stock_product', refId: 'sp-003', description: 'TrailTek Mudguard Set', quantity: 1, unit: 'set', unitPrice: 220.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 220.00 },
        ],
      },
    ],
    lineItems: [
      { id: 'li-004', type: 'labour', refId: 'lab-002', description: 'Welding — Chassis Assembly', quantity: 8, unit: 'hrs', unitPrice: 135.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1080.00 },
      { id: 'li-005', type: 'labour', refId: 'lab-001', description: 'Fabrication — Toolbox', quantity: 4, unit: 'hrs', unitPrice: 120.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 480.00 },
    ],
    linkedPOIds: ['po-001'],
    invoiceId: 'inv-001',
    quoteId: 'quo-001',
    assignedDate: '2026-05-01',
    dueDate: '2026-05-14',
    notes: 'Customer wants ramp gate on left side. Check measurements with Sophie before cutting.',
    markupPercent: 0, discountPercent: 0, atCostPrice: false,
    createdAt: '2026-04-28T08:00:00Z', updatedAt: '2026-05-04T14:30:00Z',
  },
  {
    id: 'job-002', jobNumber: 'JOB-0113', customerId: 'cust-004', brandId: 'brand-002',
    title: 'Bracket Set — Parata Engineering Order', description: 'Set of 20 heavy duty mounting brackets to spec',
    status: 'completed', quoteStatus: 'accepted', designStatus: 'completed',
    depositRequired: false, depositAmount: 0, depositPaid: false,
    isCash: false, isInternal: false,
    checklist: [
      { id: 'cl-009', label: 'Design Made', checked: true },
      { id: 'cl-010', label: 'Quote Sent', checked: true },
      { id: 'cl-011', label: 'Quote Accepted', checked: true },
      { id: 'cl-012', label: 'Deposit Received', checked: false },
      { id: 'cl-013', label: 'Materials Ordered', checked: true },
      { id: 'cl-014', label: 'Production Started', checked: true },
      { id: 'cl-015', label: 'Quality Check', checked: true },
      { id: 'cl-016', label: 'Invoice Sent', checked: true },
    ],
    checklistDisabled: false,
    sections: [],
    lineItems: [
      { id: 'li-010', type: 'stock_product', refId: 'sp-002', description: 'SteelForm Heavy Duty Bracket', quantity: 20, unit: 'ea', unitPrice: 95.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1900.00 },
      { id: 'li-011', type: 'labour', refId: 'lab-001', description: 'Fabrication', quantity: 6, unit: 'hrs', unitPrice: 120.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 720.00 },
    ],
    linkedPOIds: [],
    invoiceId: 'inv-002',
    assignedDate: '2026-04-22',
    dueDate: '2026-04-30',
    notes: 'Delivered 30/04. Invoice sent.',
    markupPercent: 0, discountPercent: 0, atCostPrice: false,
    createdAt: '2026-04-20T09:00:00Z', updatedAt: '2026-04-30T16:00:00Z',
  },
  {
    id: 'job-003', jobNumber: 'JOB-0114', customerId: 'cust-001', brandId: 'brand-003',
    title: 'Off-Road Bumper — Tanner Contracting', description: 'Custom steel front bumper with winch mount',
    status: 'draft', quoteStatus: 'sent', designStatus: 'in_progress',
    depositRequired: true, depositAmount: 400, depositPaid: false,
    isCash: false, isInternal: false,
    checklist: [
      { id: 'cl-017', label: 'Design Made', checked: false },
      { id: 'cl-018', label: 'Quote Sent', checked: true },
      { id: 'cl-019', label: 'Quote Accepted', checked: false },
      { id: 'cl-020', label: 'Deposit Received', checked: false },
      { id: 'cl-021', label: 'Materials Ordered', checked: false },
      { id: 'cl-022', label: 'Production Started', checked: false },
      { id: 'cl-023', label: 'Quality Check', checked: false },
      { id: 'cl-024', label: 'Invoice Sent', checked: false },
    ],
    checklistDisabled: false,
    sections: [],
    lineItems: [
      { id: 'li-020', type: 'stock_item', refId: 'si-002', description: '6mm Steel Plate', quantity: 1.5, unit: 'sheet', unitPrice: 260.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 390.00 },
      { id: 'li-021', type: 'labour', refId: 'lab-003', description: 'Design & Engineering', quantity: 3, unit: 'hrs', unitPrice: 150.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 450.00 },
    ],
    linkedPOIds: [],
    assignedDate: '2026-05-05',
    dueDate: '2026-05-20',
    notes: 'Waiting on customer to confirm winch brand before finalising design.',
    markupPercent: 0, discountPercent: 0, atCostPrice: false,
    createdAt: '2026-05-02T11:00:00Z', updatedAt: '2026-05-05T09:00:00Z',
  },
  {
    id: 'job-004', jobNumber: 'JOB-0115', customerId: '', brandId: 'brand-001',
    title: 'Workshop Bench Fabrication', description: 'Internal steel workbench for workshop — 3 units',
    status: 'internal', quoteStatus: 'none', designStatus: 'completed',
    depositRequired: false, depositAmount: 0, depositPaid: false,
    isCash: false, isInternal: true,
    checklist: [],
    checklistDisabled: true,
    sections: [],
    lineItems: [
      { id: 'li-030', type: 'stock_item', refId: 'si-001', description: '50x50 RHS Steel Section', quantity: 18, unit: 'm', unitPrice: 28.50, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 513.00 },
      { id: 'li-031', type: 'labour', refId: 'lab-002', description: 'Welding', quantity: 6, unit: 'hrs', unitPrice: 55.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 330.00 },
    ],
    linkedPOIds: [],
    assignedDate: '2026-05-05',
    dueDate: '2026-05-08',
    notes: 'Internal use only — cost tracking only.',
    markupPercent: 0, discountPercent: 0, atCostPrice: true,
    createdAt: '2026-05-03T07:00:00Z', updatedAt: '2026-05-05T08:00:00Z',
  },
  {
    id: 'job-005', jobNumber: 'JOB-0116', customerId: 'cust-005', brandId: 'brand-004',
    title: 'Roll Cage — Hollis Motorsport', description: 'Custom 6-point roll cage, 4130 chromoly',
    status: 'in_progress', quoteStatus: 'accepted', designStatus: 'completed',
    depositRequired: true, depositAmount: 1500, depositPaid: true,
    isCash: true, isInternal: false,
    checklist: [
      { id: 'cl-025', label: 'Design Made', checked: true },
      { id: 'cl-026', label: 'Quote Sent', checked: true },
      { id: 'cl-027', label: 'Quote Accepted', checked: true },
      { id: 'cl-028', label: 'Deposit Received', checked: true },
      { id: 'cl-029', label: 'Materials Ordered', checked: true },
      { id: 'cl-030', label: 'Production Started', checked: true },
      { id: 'cl-031', label: 'Quality Check', checked: false },
      { id: 'cl-032', label: 'Invoice Sent', checked: false },
    ],
    checklistDisabled: false,
    sections: [
      {
        id: 'sec-003', name: 'Main Cage Structure',
        lineItems: [
          { id: 'li-040', type: 'stock_item', refId: 'si-001', description: '50x50 RHS Steel Section', quantity: 12, unit: 'm', unitPrice: 42.00, markupPercent: 15, discountPercent: 0, gstIncluded: false, total: 579.60 },
        ],
      },
    ],
    lineItems: [
      { id: 'li-041', type: 'labour', refId: 'lab-002', description: 'Welding — Roll Cage', quantity: 14, unit: 'hrs', unitPrice: 135.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1890.00 },
    ],
    linkedPOIds: ['po-002'],
    assignedDate: '2026-05-05',
    dueDate: '2026-05-18',
    notes: 'CASH JOB — not included in revenue. Costs tracked for internal records.',
    markupPercent: 0, discountPercent: 0, atCostPrice: false,
    createdAt: '2026-04-29T10:00:00Z', updatedAt: '2026-05-04T17:00:00Z',
  },
];

// ─── INVOICES ─────────────────────────────────────────────────────────────────
export const INVOICES: Invoice[] = [
  {
    id: 'inv-001', invoiceNumber: 'INV-0112', customerId: 'cust-002', brandId: 'brand-001',
    jobId: 'job-001', status: 'sent', isCash: false,
    lineItems: [
      { id: 'ili-001', type: 'stock_item', refId: 'si-001', description: '50x50 RHS Steel Section', quantity: 24, unit: 'm', unitPrice: 42.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1008.00 },
      { id: 'ili-002', type: 'stock_item', refId: 'si-002', description: '6mm Steel Plate', quantity: 2, unit: 'sheet', unitPrice: 260.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 520.00 },
      { id: 'ili-003', type: 'stock_product', refId: 'sp-003', description: 'TrailTek Mudguard Set', quantity: 1, unit: 'set', unitPrice: 220.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 220.00 },
      { id: 'ili-004', type: 'labour', refId: 'lab-002', description: 'Welding — Chassis Assembly', quantity: 8, unit: 'hrs', unitPrice: 135.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1080.00 },
      { id: 'ili-005', type: 'labour', refId: 'lab-001', description: 'Fabrication — Toolbox', quantity: 4, unit: 'hrs', unitPrice: 120.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 480.00 },
    ],
    sections: [
      {
        id: 'isec-001', name: 'Chassis',
        lineItems: [
          { id: 'ili-001', type: 'stock_item', refId: 'si-001', description: '50x50 RHS Steel Section', quantity: 24, unit: 'm', unitPrice: 42.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1008.00 },
          { id: 'ili-002', type: 'stock_item', refId: 'si-002', description: '6mm Steel Plate', quantity: 2, unit: 'sheet', unitPrice: 260.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 520.00 },
        ],
      },
    ],
    linkedPOIds: ['po-001'],
    subtotal: 3308.00, discountAmount: 0, discountPercent: 0, markupPercent: 0,
    depositAmount: 800, depositPaid: true,
    gstAmount: 496.20, total: 3808.20, amountPaid: 800, amountDue: 3008.20,
    notes: 'Thank you for your business!',
    terms: 'Payment due within 14 days of invoice date.',
    issueDate: '2026-05-01', dueDate: '2026-05-15',
    atCostPrice: false, createdAt: '2026-05-01T10:00:00Z', updatedAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 'inv-002', invoiceNumber: 'INV-0113', customerId: 'cust-004', brandId: 'brand-002',
    jobId: 'job-002', status: 'paid', isCash: false,
    lineItems: [
      { id: 'ili-010', type: 'stock_product', refId: 'sp-002', description: 'SteelForm Heavy Duty Bracket', quantity: 20, unit: 'ea', unitPrice: 95.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1900.00 },
      { id: 'ili-011', type: 'labour', refId: 'lab-001', description: 'Fabrication', quantity: 6, unit: 'hrs', unitPrice: 120.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 720.00 },
    ],
    sections: [],
    linkedPOIds: [],
    subtotal: 2620.00, discountAmount: 0, discountPercent: 0, markupPercent: 0,
    depositAmount: 0, depositPaid: false,
    gstAmount: 393.00, total: 3013.00, amountPaid: 3013.00, amountDue: 0,
    notes: '',
    terms: 'Payment due within 14 days of invoice date.',
    issueDate: '2026-04-30', dueDate: '2026-05-14',
    atCostPrice: false, createdAt: '2026-04-30T16:00:00Z', updatedAt: '2026-05-02T11:00:00Z',
  },
  {
    id: 'inv-003', invoiceNumber: 'INV-0114', customerId: 'cust-001', brandId: 'brand-003',
    jobId: 'job-003', status: 'draft', isCash: false,
    lineItems: [
      { id: 'ili-020', type: 'stock_item', refId: 'si-002', description: '6mm Steel Plate', quantity: 1.5, unit: 'sheet', unitPrice: 260.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 390.00 },
      { id: 'ili-021', type: 'labour', refId: 'lab-003', description: 'Design & Engineering', quantity: 3, unit: 'hrs', unitPrice: 150.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 450.00 },
    ],
    sections: [],
    linkedPOIds: [],
    subtotal: 840.00, discountAmount: 0, discountPercent: 0, markupPercent: 0,
    depositAmount: 400, depositPaid: false,
    gstAmount: 126.00, total: 966.00, amountPaid: 0, amountDue: 966.00,
    notes: 'Awaiting quote acceptance before finalising.',
    terms: 'Payment due within 14 days of invoice date.',
    issueDate: '2026-05-05', dueDate: '2026-05-19',
    atCostPrice: false, createdAt: '2026-05-05T09:00:00Z', updatedAt: '2026-05-05T09:00:00Z',
  },
  {
    id: 'inv-004', invoiceNumber: 'INV-0110', customerId: 'cust-003', brandId: 'brand-002',
    status: 'overdue', isCash: false,
    lineItems: [
      { id: 'ili-030', type: 'manual', description: 'Custom fabrication service', quantity: 1, unit: 'ea', unitPrice: 1450.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 1450.00 },
    ],
    sections: [],
    linkedPOIds: [],
    subtotal: 1450.00, discountAmount: 0, discountPercent: 0, markupPercent: 0,
    depositAmount: 0, depositPaid: false,
    gstAmount: 217.50, total: 1667.50, amountPaid: 0, amountDue: 1667.50,
    notes: 'Second reminder sent 28/04.',
    terms: 'Payment due within 14 days of invoice date.',
    issueDate: '2026-04-10', dueDate: '2026-04-24',
    atCostPrice: false, createdAt: '2026-04-10T09:00:00Z', updatedAt: '2026-04-28T10:00:00Z',
  },
  {
    id: 'inv-005', invoiceNumber: 'INV-0111', customerId: 'cust-004', brandId: 'brand-001',
    status: 'overdue', isCash: false,
    lineItems: [
      { id: 'ili-040', type: 'manual', description: 'Steel supply — structural sections', quantity: 1, unit: 'lot', unitPrice: 3200.00, markupPercent: 0, discountPercent: 0, gstIncluded: false, total: 3200.00 },
    ],
    sections: [],
    linkedPOIds: [],
    subtotal: 3200.00, discountAmount: 0, discountPercent: 0, markupPercent: 0,
    depositAmount: 0, depositPaid: false,
    gstAmount: 480.00, total: 3680.00, amountPaid: 0, amountDue: 3680.00,
    notes: 'Overdue — follow up required.',
    terms: 'Payment due within 14 days of invoice date.',
    issueDate: '2026-04-18', dueDate: '2026-05-02',
    atCostPrice: false, createdAt: '2026-04-18T14:00:00Z', updatedAt: '2026-05-01T09:00:00Z',
  },
];

// ─── PURCHASE ORDERS ──────────────────────────────────────────────────────────
export const PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-001', poNumber: 'PO-0045', supplierId: 'sup-001', brandId: 'brand-001',
    jobId: 'job-001', status: 'received',
    lineItems: [
      { id: 'pli-001', stockItemId: 'si-001', description: '50x50 RHS Steel Section', quantity: 30, unit: 'm', unitPrice: 28.50, total: 855.00, jobId: 'job-001', received: true, receivedQty: 30 },
      { id: 'pli-002', stockItemId: 'si-002', description: '6mm Steel Plate', quantity: 4, unit: 'sheet', unitPrice: 185.00, total: 740.00, jobId: 'job-001', received: true, receivedQty: 4 },
    ],
    subtotal: 1595.00, gstAmount: 239.25, total: 1834.25,
    notes: 'Urgent — required for JOB-0112',
    receivedDate: '2026-04-30',
    documentUrl: '/docs/po-0045-invoice.pdf',
    createdAt: '2026-04-28T08:00:00Z', dueDate: '2026-05-05',
  },
  {
    id: 'po-002', poNumber: 'PO-0046', supplierId: 'sup-003', brandId: 'brand-004',
    jobId: 'job-005', status: 'sent',
    lineItems: [
      { id: 'pli-003', stockItemId: 'si-003', description: 'M12x100 Hex Bolt Grade 8.8', quantity: 50, unit: 'ea', unitPrice: 1.85, total: 92.50, jobId: 'job-005', received: false, receivedQty: 0 },
    ],
    subtotal: 92.50, gstAmount: 13.88, total: 106.38,
    notes: 'For roll cage project',
    createdAt: '2026-05-02T11:00:00Z', dueDate: '2026-05-10',
  },
  {
    id: 'po-003', poNumber: 'PO-0047', supplierId: 'sup-004', brandId: 'brand-003',
    status: 'draft',
    lineItems: [
      { id: 'pli-004', stockItemId: 'si-004', description: 'Etch Primer 4L', quantity: 6, unit: 'tin', unitPrice: 62.00, total: 372.00, received: false, receivedQty: 0 },
    ],
    subtotal: 372.00, gstAmount: 55.80, total: 427.80,
    notes: 'Stock replenishment — paint store low',
    createdAt: '2026-05-04T09:00:00Z', dueDate: '2026-05-15',
  },
];

// ─── CALENDAR NOTES ───────────────────────────────────────────────────────────
export const CALENDAR_NOTES: CalendarNote[] = [
  { id: 'cn-001', date: '2026-05-05', title: 'Material delivery — MetalMart', note: 'RHS and plate delivery arriving between 9-11am. Check quantities against PO-0045.', brandId: 'brand-001', jobId: 'job-001', isInternal: false, type: 'note' },
  { id: 'cn-002', date: '2026-05-05', title: 'Roll cage fitting session', note: 'Dean Hollis bringing car in at 2pm for cage fitting check.', brandId: 'brand-004', jobId: 'job-005', isInternal: false, type: 'job' },
  { id: 'cn-003', date: '2026-05-06', title: 'Mudguard production run', note: 'Batch of 10 mudguard sets scheduled. Check primer stock first.', brandId: 'brand-003', isInternal: false, type: 'production' },
  { id: 'cn-004', date: '2026-05-07', title: 'Quote review — Tanner Contracting', note: 'Call Liam at 10am to discuss bumper quote. He had questions about winch rating.', brandId: 'brand-003', jobId: 'job-003', isInternal: false, type: 'note' },
  { id: 'cn-005', date: '2026-05-05', title: 'Workshop bench welding', note: 'Internal — complete bench frames before end of day.', isInternal: true, jobId: 'job-004', type: 'job' },
];

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
export type AppSettings = {
  invoiceStartNumber: number;
  jobStartNumber: number;
  quoteStartNumber: number;
  poStartNumber: number;
  defaultGstRate: number;
  defaultMarkupPercent: number;
  defaultPaymentTermsDays: number;
  defaultImportMarkup: number;
  businessName: string;
  businessNzbn: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress1: string;
  businessCity: string;
  businessPostcode: string;
  businessCountry: string;
  checklistItems: { id: string; label: string; defaultEnabled: boolean }[];
  productCategories: { id: string; name: string }[];
};

export const APP_SETTINGS: AppSettings = {
  invoiceStartNumber: 110,
  jobStartNumber: 112,
  quoteStartNumber: 50,
  poStartNumber: 45,
  defaultGstRate: 15,
  defaultMarkupPercent: 40,
  defaultPaymentTermsDays: 14,
  defaultImportMarkup: 35,
  businessName: 'TradeDesk Operations Ltd',
  businessNzbn: '9429046999001',
  businessPhone: '07 123 4567',
  businessEmail: 'admin@tradedesk.co.nz',
  businessAddress1: '1 Workshop Drive',
  businessCity: 'Hamilton',
  businessPostcode: '3200',
  businessCountry: 'New Zealand',
  checklistItems: [
    { id: 'cli-001', label: 'Design Made', defaultEnabled: true },
    { id: 'cli-002', label: 'Design in Progress', defaultEnabled: true },
    { id: 'cli-003', label: 'Quote Sent', defaultEnabled: true },
    { id: 'cli-004', label: 'Quote Accepted', defaultEnabled: true },
    { id: 'cli-005', label: 'Deposit Required', defaultEnabled: true },
    { id: 'cli-006', label: 'Deposit Received', defaultEnabled: true },
    { id: 'cli-007', label: 'Materials Ordered', defaultEnabled: true },
    { id: 'cli-008', label: 'Production Started', defaultEnabled: true },
    { id: 'cli-009', label: 'Quality Check', defaultEnabled: true },
    { id: 'cli-010', label: 'Invoice Sent', defaultEnabled: true },
    { id: 'cli-011', label: 'Payment Received', defaultEnabled: true },
  ],
  productCategories: [
    { id: 'cat-001', name: 'Raw Material — Steel' },
    { id: 'cat-002', name: 'Fasteners' },
    { id: 'cat-003', name: 'Consumables' },
    { id: 'cat-004', name: 'Welding Supplies' },
    { id: 'cat-prod-001', name: 'Trailers' },
    { id: 'cat-prod-002', name: 'Brackets & Mounts' },
    { id: 'cat-prod-003', name: 'Body Panels' },
  ],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
export function formatNZD(value: number): string {
  return '$' + value.toLocaleString('en-NZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function getCustomerById(id: string): Customer | undefined {
  return CUSTOMERS.find((c) => c.id === id);
}

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find((b) => b.id === id);
}

export function getSupplierById(id: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.id === id);
}

export function getLabourTypeById(id: string): LabourType | undefined {
  return LABOUR_TYPES.find((l) => l.id === id);
}

export function getStockItemById(id: string): StockItem | undefined {
  return STOCK_ITEMS.find((s) => s.id === id);
}