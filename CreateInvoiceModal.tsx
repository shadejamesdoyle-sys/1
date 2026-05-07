'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import type { Invoice, LineItem } from '@/lib/mock-data';
import { formatNZD } from '@/lib/mock-data';
import { getCustomers, getBrands, getJobs, getStockItems, getStockProducts, getLabourTypes, getSettings } from '@/lib/store';
import { Plus, Trash2, Search } from 'lucide-react';

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (invoice: Invoice) => void;
}

export default function CreateInvoiceModal({ open, onClose, onCreated }: CreateInvoiceModalProps) {
  const [customers, setCustomers] = useState(getCustomers());
  const [brands, setBrands] = useState(getBrands());
  const [jobs, setJobs] = useState(getJobs());
  const [searchPool, setSearchPool] = useState<{ id: string; type: 'stock_item' | 'stock_product' | 'labour'; label: string; price: number; unit: string; gstIncluded: boolean }[]>([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lineSearch, setLineSearch] = useState('');
  const [lineSearchResults, setLineSearchResults] = useState<typeof searchPool>([]);
  const [showResults, setShowResults] = useState(false);

  const [form, setForm] = useState({
    customerId: '',
    brandId: '',
    jobId: '',
    isCash: false,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
    terms: '',
    depositAmount: '',
    depositPaid: false,
    discountPercent: '',
    markupPercent: '',
    lineItems: [] as LineItem[],
  });

  useEffect(() => {
    if (open) {
      const c = getCustomers();
      const b = getBrands();
      const j = getJobs();
      const si = getStockItems();
      const sp = getStockProducts();
      const lt = getLabourTypes();
      const settings = getSettings();
      setCustomers(c);
      setBrands(b);
      setJobs(j);
      setSearchPool([
        ...si.map((s) => ({ id: s.id, type: 'stock_item' as const, label: `${s.code} — ${s.name}`, price: s.sellPrice, unit: s.unit, gstIncluded: s.gstIncluded })),
        ...sp.map((s) => ({ id: s.id, type: 'stock_product' as const, label: `${s.code} — ${s.name}`, price: s.sellPrice, unit: 'ea', gstIncluded: s.gstIncluded })),
        ...lt.map((l) => ({ id: l.id, type: 'labour' as const, label: `Labour — ${l.name}`, price: l.ratePerHour, unit: 'hrs', gstIncluded: false })),
      ]);
      setForm((f) => ({ ...f, terms: `Payment due within ${settings.defaultPaymentTermsDays} days of invoice date.` }));
    }
  }, [open]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.customerId) e.customerId = 'Customer is required';
    if (!form.brandId) e.brandId = 'Brand is required';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    if (form.lineItems.length === 0) e.lineItems = 'Add at least one line item';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleLineSearch(q: string) {
    setLineSearch(q);
    if (!q.trim()) { setLineSearchResults([]); return; }
    setLineSearchResults(searchPool.filter((p) => p.label.toLowerCase().includes(q.toLowerCase())).slice(0, 5));
  }

  function addFromSearch(item: typeof searchPool[0]) {
    const newLine: LineItem = {
      id: `ci-li-${Date.now()}`,
      type: item.type,
      refId: item.id,
      description: item.label,
      quantity: 1,
      unit: item.unit,
      unitPrice: item.price,
      markupPercent: 0,
      discountPercent: 0,
      gstIncluded: item.gstIncluded,
      total: item.price,
    };
    setForm((f) => ({ ...f, lineItems: [...f.lineItems, newLine] }));
    setLineSearch('');
    setLineSearchResults([]);
    setShowResults(false);
  }

  function addManualLine() {
    const newLine: LineItem = {
      id: `ci-manual-${Date.now()}`,
      type: 'manual',
      description: '',
      quantity: 1,
      unit: 'ea',
      unitPrice: 0,
      markupPercent: 0,
      discountPercent: 0,
      gstIncluded: false,
      total: 0,
    };
    setForm((f) => ({ ...f, lineItems: [...f.lineItems, newLine] }));
  }

  function updateLine(id: string, field: keyof LineItem, value: string | number | boolean) {
    setForm((f) => ({
      ...f,
      lineItems: f.lineItems.map((li) => {
        if (li.id !== id) return li;
        const updated = { ...li, [field]: value };
        updated.total = updated.quantity * updated.unitPrice * (1 + updated.markupPercent / 100) * (1 - updated.discountPercent / 100);
        return updated;
      }),
    }));
  }

  function removeLine(id: string) {
    setForm((f) => ({ ...f, lineItems: f.lineItems.filter((li) => li.id !== id) }));
  }

  const subtotal = form.lineItems.reduce((s, li) => s + li.total, 0);
  const markupAmt = subtotal * (parseFloat(form.markupPercent) || 0) / 100;
  const discountAmt = (subtotal + markupAmt) * (parseFloat(form.discountPercent) || 0) / 100;
  const afterAdj = subtotal + markupAmt - discountAmt;
  const gstAmount = afterAdj * 0.15;
  const total = afterAdj + gstAmount;

  function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const settings = getSettings();
      const invNum = settings.invoiceStartNumber + Math.floor(Math.random() * 5) + 6;
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        invoiceNumber: `INV-${String(invNum).padStart(4, '0')}`,
        customerId: form.customerId,
        brandId: form.brandId,
        jobId: form.jobId || undefined,
        status: 'draft',
        isCash: form.isCash,
        lineItems: form.lineItems,
        sections: [],
        linkedPOIds: [],
        subtotal: afterAdj,
        discountAmount: discountAmt,
        discountPercent: parseFloat(form.discountPercent) || 0,
        markupPercent: parseFloat(form.markupPercent) || 0,
        depositAmount: parseFloat(form.depositAmount) || 0,
        depositPaid: form.depositPaid,
        gstAmount,
        total,
        amountPaid: form.depositPaid ? (parseFloat(form.depositAmount) || 0) : 0,
        amountDue: total - (form.depositPaid ? (parseFloat(form.depositAmount) || 0) : 0),
        notes: form.notes,
        terms: form.terms,
        issueDate: form.issueDate,
        dueDate: form.dueDate,
        atCostPrice: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onCreated(newInvoice);
      setLoading(false);
      onClose();
      setForm({ customerId: '', brandId: '', jobId: '', isCash: false, issueDate: new Date().toISOString().split('T')[0], dueDate: '', notes: '', terms: '', depositAmount: '', depositPaid: false, discountPercent: '', markupPercent: '', lineItems: [] });
      setErrors({});
    }, 500);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Invoice"
      subtitle="Create a standalone invoice or link it to an existing job"
      size="xl"
      footer={
        <>
          <button className="btn-secondary text-xs py-1.5 px-3" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn-primary text-xs py-1.5 px-4 flex items-center gap-2 min-w-[130px] justify-center" onClick={handleSubmit} disabled={loading}>
            {loading && <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? 'Creating...' : 'Create Invoice'}
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">Invoice Details</p>
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Customer <span className="text-red-400">*</span></label>
            <select className="input-field" value={form.customerId} onChange={(e) => setForm((f) => ({ ...f, customerId: e.target.value }))}>
              <option value="">— Select Customer —</option>
              {customers.map((c) => <option key={`ci-cust-${c.id}`} value={c.id}>{c.name}{c.company ? ` — ${c.company}` : ''}</option>)}
            </select>
            {errors.customerId && <p className="text-xs mt-1" style={{ color: 'var(--red-light)' }}>{errors.customerId}</p>}
          </div>
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Brand <span className="text-red-400">*</span></label>
            <select className="input-field" value={form.brandId} onChange={(e) => setForm((f) => ({ ...f, brandId: e.target.value }))}>
              <option value="">— Select Brand —</option>
              {brands.map((b) => <option key={`ci-brand-${b.id}`} value={b.id}>{b.name}</option>)}
            </select>
            {errors.brandId && <p className="text-xs mt-1" style={{ color: 'var(--red-light)' }}>{errors.brandId}</p>}
          </div>
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Link to Job (optional)</label>
            <p className="text-2xs text-muted-foreground mb-1">Leave blank to create a standalone invoice</p>
            <select className="input-field" value={form.jobId} onChange={(e) => setForm((f) => ({ ...f, jobId: e.target.value }))}>
              <option value="">— Standalone Invoice —</option>
              {jobs.map((j) => <option key={`ci-job-${j.id}`} value={j.id}>{j.jobNumber} — {j.title}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-600 text-foreground mb-1">Issue Date</label>
              <input type="date" className="input-field" value={form.issueDate} onChange={(e) => setForm((f) => ({ ...f, issueDate: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-600 text-foreground mb-1">Due Date <span className="text-red-400">*</span></label>
              <input type="date" className="input-field" value={form.dueDate} onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))} />
              {errors.dueDate && <p className="text-xs mt-1" style={{ color: 'var(--red-light)' }}>{errors.dueDate}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-600 text-foreground mb-1">Markup (%)</label>
              <input type="number" className="input-field" placeholder="0" value={form.markupPercent} onChange={(e) => setForm((f) => ({ ...f, markupPercent: e.target.value }))} onFocus={(e) => e.target.select()} />
            </div>
            <div>
              <label className="block text-xs font-600 text-foreground mb-1">Discount (%)</label>
              <input type="number" className="input-field" placeholder="0" value={form.discountPercent} onChange={(e) => setForm((f) => ({ ...f, discountPercent: e.target.value }))} onFocus={(e) => e.target.select()} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-600 text-foreground mb-1">Deposit Amount ($)</label>
              <input type="number" className="input-field" placeholder="0.00" value={form.depositAmount} onChange={(e) => setForm((f) => ({ ...f, depositAmount: e.target.value }))} onFocus={(e) => e.target.select()} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.depositPaid} onChange={(e) => setForm((f) => ({ ...f, depositPaid: e.target.checked }))} className="w-3.5 h-3.5" />
                <span className="text-xs font-600 text-foreground">Deposit Paid</span>
              </label>
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer p-2.5" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: form.isCash ? 'var(--yellow-bg)' : 'var(--input)' }}>
            <input type="checkbox" checked={form.isCash} onChange={(e) => setForm((f) => ({ ...f, isCash: e.target.checked }))} className="w-3.5 h-3.5" />
            <div>
              <p className="text-xs font-600 text-foreground">Cash Invoice</p>
              <p className="text-2xs text-muted-foreground">Excluded from revenue calculations</p>
            </div>
          </label>
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Notes</label>
            <textarea className="input-field" rows={2} value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
          </div>
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Payment Terms</label>
            <textarea className="input-field" rows={2} value={form.terms} onChange={(e) => setForm((f) => ({ ...f, terms: e.target.value }))} />
          </div>
        </div>

        {/* Right column — line items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">Line Items</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setShowResults((s) => !s)} className="btn-ghost text-xs flex items-center gap-1"><Search size={11} /> Search</button>
              <button onClick={addManualLine} className="btn-ghost text-xs flex items-center gap-1"><Plus size={11} /> Manual</button>
            </div>
          </div>

          {showResults && (
            <div className="relative">
              <input
                className="input-field"
                placeholder="Search stock items, products, labour..."
                value={lineSearch}
                onChange={(e) => handleLineSearch(e.target.value)}
                onFocus={(e) => e.target.select()}
                autoFocus
              />
              {lineSearchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-20 mt-1 overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '2px' }}>
                  {lineSearchResults.map((r) => (
                    <button key={`lsr-${r.id}`} onClick={() => addFromSearch(r)} className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-muted/30 transition-colors text-left">
                      <span className="text-foreground truncate">{r.label}</span>
                      <span className="text-muted-foreground ml-2 flex-shrink-0">{formatNZD(r.price)}/{r.unit}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {errors.lineItems && <p className="text-xs" style={{ color: 'var(--red-light)' }}>{errors.lineItems}</p>}

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {form.lineItems.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">No line items yet. Search or add manually.</p>
            ) : (
              form.lineItems.map((li) => (
                <div key={`cili-${li.id}`} className="p-2.5 space-y-2" style={{ border: '1px solid var(--border)', borderRadius: '2px', background: 'var(--input)' }}>
                  <div className="flex items-center gap-2">
                    <input className="input-field flex-1 text-xs" placeholder="Description" value={li.description} onChange={(e) => updateLine(li.id, 'description', e.target.value)} onFocus={(e) => e.target.select()} />
                    <button onClick={() => removeLine(li.id)} className="p-1 text-muted-foreground hover:text-red-400 transition-colors flex-shrink-0" style={{ borderRadius: '2px' }}><Trash2 size={12} /></button>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <div><label className="block text-2xs text-muted-foreground mb-0.5">Qty</label><input type="number" className="input-field text-xs" value={li.quantity} onChange={(e) => updateLine(li.id, 'quantity', parseFloat(e.target.value) || 0)} onFocus={(e) => e.target.select()} /></div>
                    <div><label className="block text-2xs text-muted-foreground mb-0.5">Unit</label><input className="input-field text-xs" value={li.unit} onChange={(e) => updateLine(li.id, 'unit', e.target.value)} onFocus={(e) => e.target.select()} /></div>
                    <div><label className="block text-2xs text-muted-foreground mb-0.5">Price</label><input type="number" className="input-field text-xs" value={li.unitPrice} onChange={(e) => updateLine(li.id, 'unitPrice', parseFloat(e.target.value) || 0)} onFocus={(e) => e.target.select()} /></div>
                    <div><label className="block text-2xs text-muted-foreground mb-0.5">Total</label><p className="text-xs font-700 font-tabular pt-1.5" style={{ color: 'var(--green-light)' }}>{formatNZD(li.total)}</p></div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          <div className="space-y-1.5 pt-2 border-t border-border">
            {[
              { label: 'Subtotal', value: formatNZD(subtotal) },
              { label: `Markup (${form.markupPercent || 0}%)`, value: `+${formatNZD(markupAmt)}` },
              { label: `Discount (${form.discountPercent || 0}%)`, value: `-${formatNZD(discountAmt)}` },
              { label: 'GST (15%)', value: formatNZD(gstAmount) },
            ].map((row) => (
              <div key={`tot-${row.label}`} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="text-xs font-tabular text-foreground">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-1 border-t border-border">
              <span className="text-sm font-700 text-foreground">Total</span>
              <span className="text-sm font-700 font-tabular" style={{ color: 'var(--green-light)' }}>{formatNZD(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}