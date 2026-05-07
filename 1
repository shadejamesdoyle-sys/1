'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import type { Job } from '@/lib/mock-data';
import { getCustomers, getBrands, getSettings } from '@/lib/store';
import { Plus, Minus } from 'lucide-react';

interface CreateJobModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (job: Job) => void;
}

export default function CreateJobModal({ open, onClose, onCreated }: CreateJobModalProps) {
  const [customers, setCustomers] = useState(getCustomers());
  const [brands, setBrands] = useState(getBrands());

  const [form, setForm] = useState({
    jobNumber: '',
    title: '',
    description: '',
    customerId: '',
    brandId: '',
    dueDate: '',
    assignedDate: new Date().toISOString().split('T')[0],
    isCash: false,
    isInternal: false,
    depositRequired: false,
    depositAmount: '',
    notes: '',
    quoteStatus: 'none' as Job['quoteStatus'],
    designStatus: 'none' as Job['designStatus'],
    sections: [] as { id: string; name: string }[],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill job number when modal opens
  useEffect(() => {
    if (open) {
      setCustomers(getCustomers());
      setBrands(getBrands());

      const settings = getSettings();
      const jobNum = settings.jobStartNumber + Math.floor(Math.random() * 10) + 5;
      const autoNumber = `JOB-${String(jobNum).padStart(4, '0')}`;

      setForm((f) => ({ ...f, jobNumber: autoNumber }));
    }
  }, [open]);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Job title is required';
    if (!form.brandId) e.brandId = 'Brand is required';
    if (!form.dueDate) e.dueDate = 'Due date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    setLoading(true);

    setTimeout(() => {
      const settings = getSettings();

      const newJob: Job = {
        id: `job-${Date.now()}`,
        jobNumber: form.jobNumber, // ← uses the editable field
        customerId: form.customerId,
        brandId: form.brandId,
        title: form.title,
        description: form.description,
        status: 'draft',
        quoteStatus: form.quoteStatus,
        designStatus: form.designStatus,
        depositRequired: form.depositRequired,
        depositAmount: form.depositRequired ? parseFloat(form.depositAmount) || 0 : 0,
        depositPaid: false,
        isCash: form.isCash,
        isInternal: form.isInternal,
        checklist: settings.checklistItems
          .filter((ci) => ci.defaultEnabled)
          .map((ci) => ({ id: `cl-new-${ci.id}`, label: ci.label, checked: false })),
        checklistDisabled: form.isInternal,
        sections: form.sections.map((s) => ({ id: s.id, name: s.name, lineItems: [] })),
        lineItems: [],
        linkedPOIds: [],
        assignedDate: form.assignedDate,
        dueDate: form.dueDate,
        notes: form.notes,
        markupPercent: 0,
        discountPercent: 0,
        atCostPrice: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onCreated(newJob);
      setLoading(false);
      onClose();

      // Reset form
      setForm({
        jobNumber: '',
        title: '',
        description: '',
        customerId: '',
        brandId: '',
        dueDate: '',
        assignedDate: new Date().toISOString().split('T')[0],
        isCash: false,
        isInternal: false,
        depositRequired: false,
        depositAmount: '',
        notes: '',
        quoteStatus: 'none',
        designStatus: 'none',
        sections: [],
      });
    }, 400);
  }

  function addSection() {
    setForm((f) => ({
      ...f,
      sections: [...f.sections, { id: `ns-${Date.now()}`, name: '' }],
    }));
  }

  function removeSection(id: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.filter((s) => s.id !== id),
    }));
  }

  function updateSectionName(id: string, name: string) {
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s) => (s.id === id ? { ...s, name } : s)),
    }));
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Job"
      subtitle="Fill in the details to create a new job card"
      size="lg"
      footer={
        <>
          <button className="btn-secondary text-xs py-1.5 px-3" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn-primary text-xs py-1.5 px-4 flex items-center gap-2 min-w-[120px] justify-center"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : null}
            {loading ? 'Creating...' : 'Create Job'}
          </button>
        </>
      }
    >
      <div className="space-y-5">
        {/* JOB DETAILS */}
        <div className="space-y-3">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">
            Job Details
          </p>

          {/* Job Title */}
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">
              Job Title <span className="text-red-400">*</span>
            </label>
            <input
              className="input-field"
              placeholder="e.g. Custom Trailer Build — 6x4 Tandem"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              onFocus={(e) => e.target.select()}
            />
            {errors.title && (
              <p className="text-xs mt-1" style={{ color: 'var(--red-light)' }}>
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Description</label>
            <textarea
              className="input-field"
              rows={2}
              placeholder="Brief description of the work to be done..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          {/* NEW JOB NUMBER FIELD — placed at bottom of Job Details */}
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Job Number</label>
            <input
              className="input-field font-tabular"
              value={form.jobNumber}
              onChange={(e) => setForm((f) => ({ ...f, jobNumber: e.target.value }))}
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>

        {/* CUSTOMER + BRAND — alignment fixed */}
        <div className="grid grid-cols-2 gap-3">
          {/* Customer */}
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Customer</label>
            <p className="text-2xs text-muted-foreground mb-1">Leave blank for internal jobs</p>
            <select
              className="input-field"
              value={form.customerId}
              onChange={(e) => setForm((f) => ({ ...f, customerId: e.target.value }))}
            >
              <option value="">— Internal / No Customer —</option>
              {customers.map((c) => (
                <option key={`cj-${c.id}`} value={c.id}>
                  {c.name}
                  {c.company ? ` — ${c.company}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Brand — add invisible spacer to align with Customer */}
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Brand *</label>
            <p className="text-2xs text-transparent mb-1">spacer</p>
            <select
              className="input-field"
              value={form.brandId}
              onChange={(e) => setForm((f) => ({ ...f, brandId: e.target.value }))}
            >
              <option value="">— Select Brand —</option>
              {brands.map((b) => (
                <option key={`bj-${b.id}`} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {errors.brandId && (
              <p className="text-xs mt-1" style={{ color: 'var(--red-light)' }}>
                {errors.brandId}
              </p>
            )}
          </div>
        </div>

        {/* DATES */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Assigned Date</label>
            <input
              type="date"
              className="input-field"
              value={form.assignedDate}
              onChange={(e) => setForm((f) => ({ ...f, assignedDate: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">
              Due Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              className="input-field"
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
            {errors.dueDate && (
              <p className="text-xs mt-1" style={{ color: 'var(--red-light)' }}>
                {errors.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* QUOTE + DESIGN STATUS */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Quote Status</label>
            <select
              className="input-field"
              value={form.quoteStatus}
              onChange={(e) =>
                setForm((f) => ({ ...f, quoteStatus: e.target.value as Job['quoteStatus'] }))
              }
            >
              <option value="none">None</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-600 text-foreground mb-1">Design Status</label>
            <select
              className="input-field"
              value={form.designStatus}
              onChange={(e) =>
                setForm((f) => ({ ...f, designStatus: e.target.value as Job['designStatus'] }))
              }
            >
              <option value="none">None</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* JOB FLAGS */}
        <div className="space-y-2">
          <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">
            Job Flags
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'isCash', label: 'Cash Job', desc: 'Excluded from revenue calculations' },
              { key: 'isInternal', label: 'Internal Job', desc: 'Cost tracking only — no invoice' },
              {
                key: 'depositRequired',
                label: 'Deposit Required',
                desc: 'Require deposit before starting',
              },
            ].map((flag) => (
              <label
                key={`flag-${flag.key}`}
                className="flex items-start gap-2.5 p-2.5 cursor-pointer hover:bg-muted/30 transition-colors"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  background:
                    (form as Record<string, unknown>)[flag.key] === true
                      ? 'var(--purple-bg)'
                      : 'var(--input)',
                }}
              >
                <input
                  type="checkbox"
                  checked={(form as Record<string, unknown>)[flag.key] as boolean}
                  onChange={(e) => setForm((f) => ({ ...f, [flag.key]: e.target.checked }))}
                  className="mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-xs font-600 text-foreground">{flag.label}</p>
                  <p className="text-2xs text-muted-foreground">{flag.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {form.depositRequired && (
            <div>
              <label className="block text-xs font-600 text-foreground mb-1">
                Deposit Amount ($)
              </label>
              <input
                type="number"
                className="input-field w-40"
                placeholder="0.00"
                value={form.depositAmount}
                onChange={(e) => setForm((f) => ({ ...f, depositAmount: e.target.value }))}
                onFocus={(e) => e.target.select()}
              />
            </div>
          )}
        </div>

        {/* JOB SECTIONS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-700 text-muted-foreground uppercase tracking-wider">
              Job Sections
            </p>
            <button onClick={addSection} className="btn-ghost text-xs flex items-center gap-1">
              <Plus size={11} /> Add Section
            </button>
          </div>

          {form.sections.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No sections — all line items will be at the top level.
            </p>
          ) : (
            <div className="space-y-2">
              {form.sections.map((sec) => (
                <div key={`ns-${sec.id}`} className="flex items-center gap-2">
                  <input
                    className="input-field flex-1 text-sm"
                    placeholder="Section name (e.g. Chassis, Electrical)"
                    value={sec.name}
                    onChange={(e) => updateSectionName(sec.id, e.target.value)}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    onClick={() => removeSection(sec.id)}
                    className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    <Minus size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NOTES */}
        <div>
          <label className="block text-xs font-600 text-foreground mb-1">Notes</label>
          <textarea
            className="input-field"
            rows={2}
            placeholder="Any additional notes for this job..."
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </div>
      </div>
    </Modal>
  );
}
