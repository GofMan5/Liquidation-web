"use client";

import { useState } from "react";
import { Target, MousePointer, Sparkles, Settings, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CheatSettings {
  // Reach
  reachEnabled: boolean;
  reachMode: "static" | "randomization";
  reachDistance: number;
  reachMin: number;
  reachMax: number;
  // Looper
  looperEnabled: boolean;
  looperCps: number;
  looperRandomize: boolean;
  // Quanta (Velocity / Anti-Knockback)
  quantaEnabled: boolean;
  quantaHorizontal: number;
  quantaVertical: number;
}

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

export default function MenuPage() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("reach");
  const [menuScale, setMenuScale] = useState(1);

  const [settings, setSettings] = useState<CheatSettings>({
    reachEnabled: true,
    reachMode: "static",
    reachDistance: 3.5,
    reachMin: 3.0,
    reachMax: 4.0,
    looperEnabled: false,
    looperCps: 12,
    looperRandomize: true,
    quantaEnabled: true,
    quantaHorizontal: 0,
    quantaVertical: 0,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseUp = () => setDragging(false);

  const toggle = (key: keyof CheatSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setSlider = (key: keyof CheatSettings, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const accentColor = "#ffffff";

  const mainTabs: Tab[] = [
    { id: "reach", label: "Reach", icon: Target, color: accentColor },
    { id: "looper", label: "Clicker", icon: MousePointer, color: accentColor },
    { id: "quanta", label: "Quanta", icon: Sparkles, color: accentColor },
  ];

  const configTab: Tab = { id: "config", label: "Settings", icon: Settings, color: accentColor };

  return (
    <div
      className="min-h-screen bg-neutral-950 relative select-none overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >

      {/* Glass menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: menuScale }}
        style={{ left: position.x, top: position.y, transformOrigin: "top left" }}
        className="absolute w-[480px] backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div
          onMouseDown={handleMouseDown}
          className="flex items-center justify-between px-5 py-4 bg-white/[0.02] border-b border-white/5 cursor-move"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="font-bold text-sm text-white/90">L</span>
            </div>
            <div>
              <h1 className="text-white/90 font-semibold text-sm">Liquidation</h1>
              <p className="text-white/30 text-xs">v2.0.0</p>
            </div>
          </div>

        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-16 bg-white/[0.01] border-r border-white/5 py-3 flex flex-col gap-1">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative mx-2 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group ${
                    isActive ? "bg-white/10" : "bg-transparent hover:bg-white/5"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${
                      isActive ? "text-white" : "text-white/30"
                    }`}
                  />
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 backdrop-blur-xl text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                    {tab.label}
                  </div>
                </button>
              );
            })}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Config at bottom */}
            <button
              onClick={() => setActiveTab(configTab.id)}
              className={`relative mx-2 h-11 rounded-xl flex items-center justify-center transition-all duration-200 group ${
                activeTab === configTab.id ? "bg-white/10" : "bg-transparent hover:bg-white/5"
              }`}
            >
              <Settings
                className={`w-5 h-5 transition-all duration-200 ${
                  activeTab === configTab.id ? "text-white" : "text-white/30"
                }`}
              />
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 backdrop-blur-xl text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 border border-white/10">
                {configTab.label}
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {activeTab === "reach" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-white/90 font-medium">Reach</h2>
                      <Toggle
                        enabled={settings.reachEnabled}
                        onChange={() => toggle("reachEnabled")}
                      />
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">
                      Увеличивает дистанцию атаки для более эффективного боя.
                    </p>

                    {settings.reachEnabled && (
                      <>
                        {settings.reachMode === "static" ? (
                          <Slider
                            label="Distance"
                            value={settings.reachDistance}
                            min={3}
                            max={4.5}
                            step={0.1}
                            unit="blocks"
                            onChange={(v) => setSlider("reachDistance", v)}
                          />
                        ) : (
                          <>
                            <Slider
                              label="Min Distance"
                              value={settings.reachMin}
                              min={3}
                              max={4.5}
                              step={0.1}
                              unit="blocks"
                              onChange={(v) => setSlider("reachMin", v)}
                            />
                            <Slider
                              label="Max Distance"
                              value={settings.reachMax}
                              min={3}
                              max={4.5}
                              step={0.1}
                              unit="blocks"
                              onChange={(v) => setSlider("reachMax", v)}
                            />
                          </>
                        )}

                        {/* Mode selector */}
                        <div className="pt-2 space-y-2">
                          <span className="text-white/50 text-sm">Mode</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSettings((prev) => ({ ...prev, reachMode: "static" }))}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                settings.reachMode === "static"
                                  ? "bg-white/20 text-white"
                                  : "bg-white/5 text-white/50 hover:bg-white/10"
                              }`}
                            >
                              Static
                            </button>
                            <button
                              onClick={() => setSettings((prev) => ({ ...prev, reachMode: "randomization" }))}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                settings.reachMode === "randomization"
                                  ? "bg-white/20 text-white"
                                  : "bg-white/5 text-white/50 hover:bg-white/10"
                              }`}
                            >
                              Randomization
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {activeTab === "looper" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-white/90 font-medium">Clicker</h2>
                      <Toggle
                        enabled={settings.looperEnabled}
                        onChange={() => toggle("looperEnabled")}
                      />
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">
                      Автоматический кликер с настраиваемой скоростью.
                    </p>
                    {settings.looperEnabled && (
                      <>
                        <Slider
                          label="CPS"
                          value={settings.looperCps}
                          min={1}
                          max={20}
                          step={1}
                          unit="clicks/s"
                          onChange={(v) => setSlider("looperCps", v)}
                        />
                      </>
                    )}
                  </>
                )}

                {activeTab === "quanta" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-white/90 font-medium">Quanta</h2>
                      <Toggle
                        enabled={settings.quantaEnabled}
                        onChange={() => toggle("quantaEnabled")}
                      />
                    </div>
                    <p className="text-white/40 text-xs leading-relaxed">
                      Уменьшает силу отталкивания персонажа (Anti-Knockback).
                    </p>
                    {settings.quantaEnabled && (
                      <>
                        <Slider
                          label="Horizontal"
                          value={settings.quantaHorizontal}
                          min={0}
                          max={100}
                          step={1}
                          unit="%"
                          onChange={(v) => setSlider("quantaHorizontal", v)}
                        />
                        <Slider
                          label="Vertical"
                          value={settings.quantaVertical}
                          min={0}
                          max={100}
                          step={1}
                          unit="%"
                          onChange={(v) => setSlider("quantaVertical", v)}
                        />
                      </>
                    )}
                  </>
                )}

                {activeTab === "config" && (
                  <ConfigPanel settings={settings} setSettings={setSettings} menuScale={menuScale} setMenuScale={setMenuScale} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


      </motion.div>
    </div>
  );
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-white/30" : "bg-white/10"
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-1 w-4 h-4 rounded-full shadow-lg ${
          enabled ? "bg-white" : "bg-white/40"
        }`}
      />
    </button>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <motion.div
        onClick={onChange}
        whileTap={{ scale: 0.9 }}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          checked ? "border-white/60 bg-white/10" : "border-white/20"
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
      <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors">{label}</span>
    </label>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const percentage = ((value - min) / (max - min)) * 100;

  const handleDoubleClick = () => {
    setInputValue(value.toFixed(step < 1 ? 1 : 0));
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(clamped);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white/50 text-sm">{label}</span>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-20 px-2 py-0.5 text-sm font-medium text-white bg-white/10 border border-white/20 rounded text-right outline-none focus:border-white/40"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="text-sm font-medium text-white/80 cursor-pointer hover:text-white transition-colors"
            title="Double-click to edit"
          >
            {value.toFixed(step < 1 ? 1 : 0)} {unit}
          </span>
        )}
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white/50 transition-[width] duration-75"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}


function ScaleSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState((value * 100).toFixed(0));
  const min = 0.75;
  const max = 2;
  const percentage = ((value - min) / (max - min)) * 100;

  const handleDoubleClick = () => {
    setInputValue((value * 100).toFixed(0));
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      const clamped = Math.min(200, Math.max(75, parsed)) / 100;
      onChange(clamped);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleInputBlur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-2 pt-1">
      <div className="flex justify-between items-center">
        <span className="text-white/40 text-xs">Scale</span>
        {isEditing ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-16 px-2 py-0.5 text-xs text-white bg-white/10 border border-white/20 rounded text-right outline-none focus:border-white/40"
          />
        ) : (
          <span
            onDoubleClick={handleDoubleClick}
            className="text-white/60 text-xs cursor-pointer hover:text-white transition-colors"
            title="Double-click to edit"
          >
            {(value * 100).toFixed(0)}%
          </span>
        )}
      </div>
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-white/50 transition-[width] duration-75"
          style={{ width: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={0.05}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

interface ConfigItem {
  id: string;
  name: string;
  date: string;
}

function ConfigPanel({
  settings,
  setSettings,
  menuScale,
  setMenuScale,
}: {
  settings: CheatSettings;
  setSettings: React.Dispatch<React.SetStateAction<CheatSettings>>;
  menuScale: number;
  setMenuScale: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [configs, setConfigs] = useState<ConfigItem[]>([
    { id: "1", name: "Default", date: "2024-01-15" },
    { id: "2", name: "Legit", date: "2024-01-20" },
    { id: "3", name: "Rage", date: "2024-02-01" },
  ]);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showOverwriteConfirm, setShowOverwriteConfirm] = useState(false);
  const [newConfigName, setNewConfigName] = useState("");

  const handleSaveNew = () => {
    if (!newConfigName.trim()) return;
    const newConfig: ConfigItem = {
      id: Date.now().toString(),
      name: newConfigName.trim(),
      date: new Date().toISOString().split("T")[0],
    };
    setConfigs((prev) => [...prev, newConfig]);
    setNewConfigName("");
    setShowSaveModal(false);
    setSelectedConfig(newConfig.id);
  };

  const handleOverwrite = () => {
    if (!selectedConfig) return;
    setConfigs((prev) =>
      prev.map((c) =>
        c.id === selectedConfig ? { ...c, date: new Date().toISOString().split("T")[0] } : c
      )
    );
    setShowOverwriteConfirm(false);
  };

  const handleDelete = () => {
    if (!selectedConfig) return;
    setConfigs((prev) => prev.filter((c) => c.id !== selectedConfig));
    setSelectedConfig(null);
    setShowDeleteConfirm(false);
  };

  const handleLoad = () => {
    if (!selectedConfig) return;
    console.log("Loading config:", selectedConfig);
  };

  const [settingsTab, setSettingsTab] = useState<"config" | "settings">("config");
  const [menuKey, setMenuKey] = useState("INSERT");
  const [isBindingKey, setIsBindingKey] = useState(false);
  const [hideUserInfo, setHideUserInfo] = useState(false);
  const [scaleEnabled, setScaleEnabled] = useState(false);

  const handleKeyBind = (e: React.KeyboardEvent) => {
    if (!isBindingKey) return;
    e.preventDefault();
    const key = e.key.toUpperCase();
    if (key === "ESCAPE") {
      setIsBindingKey(false);
      return;
    }
    setMenuKey(key === " " ? "SPACE" : key);
    setIsBindingKey(false);
  };

  return (
    <div className="space-y-4" onKeyDown={handleKeyBind} tabIndex={0}>
      <h2 className="text-white/90 font-medium">Settings</h2>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-lg">
        <button
          onClick={() => setSettingsTab("config")}
          className={`flex-1 px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
            settingsTab === "config"
              ? "bg-white/15 text-white"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          Config
        </button>
        <button
          onClick={() => setSettingsTab("settings")}
          className={`flex-1 px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
            settingsTab === "settings"
              ? "bg-white/15 text-white"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          Settings
        </button>
      </div>

      {settingsTab === "config" && (
        <>
          {/* Config list box */}
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/50 text-xs">Saved Configs</span>
              <span className="text-white/30 text-xs">{configs.length} items</span>
            </div>
        <div className="space-y-1 max-h-[120px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {configs.length === 0 ? (
            <div className="text-white/30 text-sm text-center py-4">No configs saved</div>
          ) : (
            configs.map((config) => (
              <div
                key={config.id}
                onClick={() => setSelectedConfig(selectedConfig === config.id ? null : config.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedConfig === config.id
                    ? "bg-white/15 border border-white/25"
                    : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedConfig === config.id ? "bg-white" : "bg-white/20"
                    }`}
                  />
                  <span className="text-white/80 text-sm">{config.name}</span>
                </div>
                <span className="text-white/30 text-xs">{config.date}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Actions - different based on selection */}
      {selectedConfig ? (
        <div className="flex gap-2">
          <button
            onClick={handleLoad}
            className="flex-1 px-3 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/80 text-sm transition-all duration-200"
          >
            Load
          </button>
          <button
            onClick={() => setShowOverwriteConfirm(true)}
            className="flex-1 px-3 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/80 text-sm transition-all duration-200"
          >
            Overwrite
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 text-sm transition-all duration-200"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="flex-1 px-3 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/80 text-sm transition-all duration-200"
          >
            Save New
          </button>
        </div>
      )}
        </>
      )}

      {settingsTab === "settings" && (
        <div className="space-y-3">
          <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-3">
            {/* Menu Key Binding */}
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Menu Key</span>
              <button
                onClick={() => setIsBindingKey(true)}
                className={`text-xs px-3 py-1.5 rounded transition-all duration-200 ${
                  isBindingKey
                    ? "bg-white/20 text-white border border-white/30 animate-pulse"
                    : "bg-white/10 text-white/50 hover:bg-white/15 hover:text-white/70"
                }`}
              >
                {isBindingKey ? "Press any key..." : menuKey}
              </button>
            </div>

            {/* Hide User Info (GUARD) */}
            <div className="flex items-center justify-between group relative">
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Hide user info</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 text-amber-400 rounded font-medium">GUARD</span>
                {/* Tooltip */}
                <div className="absolute left-0 bottom-full mb-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-white/60 text-xs max-w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                  Скрывает информацию о пользователе в левом верхнем углу экрана для безопасности на демках
                </div>
              </div>
              <button
                onClick={() => setHideUserInfo(!hideUserInfo)}
                className={`relative w-9 h-5 rounded-full transition-all duration-300 ${
                  hideUserInfo ? "bg-amber-500/30" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                    hideUserInfo ? "right-0.5 bg-amber-400" : "left-0.5 bg-white/40"
                  }`}
                />
              </button>
            </div>

            {/* Menu Scale */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Menu Scale</span>
                <button
                  onClick={() => setScaleEnabled(!scaleEnabled)}
                  className={`relative w-9 h-5 rounded-full transition-all duration-300 ${
                    scaleEnabled ? "bg-white/30" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full shadow-lg transition-all duration-300 ${
                      scaleEnabled ? "right-0.5 bg-white" : "left-0.5 bg-white/40"
                    }`}
                  />
                </button>
              </div>
              {scaleEnabled && (
                <ScaleSlider value={menuScale} onChange={setMenuScale} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-xl p-4 w-[280px] space-y-4"
            >
              <h3 className="text-white/90 font-medium">Save Config</h3>
              <input
                type="text"
                value={newConfigName}
                onChange={(e) => setNewConfigName(e.target.value)}
                placeholder="Config name..."
                autoFocus
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-white/30 placeholder:text-white/30"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNew}
                  disabled={!newConfigName.trim()}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                    newConfigName.trim()
                      ? "bg-white/20 hover:bg-white/30 text-white"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  }`}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overwrite Confirmation */}
      <AnimatePresence>
        {showOverwriteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-xl p-4 w-[280px] space-y-4"
            >
              <h3 className="text-white/90 font-medium">Overwrite Config?</h3>
              <p className="text-white/50 text-sm">
                Config &quot;{configs.find((c) => c.id === selectedConfig)?.name}&quot; will be overwritten with current settings.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowOverwriteConfirm(false)}
                  className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOverwrite}
                  className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-all"
                >
                  Overwrite
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-xl p-4 w-[280px] space-y-4"
            >
              <h3 className="text-white/90 font-medium">Delete Config?</h3>
              <p className="text-white/50 text-sm">
                Are you sure you want to delete &quot;{configs.find((c) => c.id === selectedConfig)?.name}&quot;?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-sm transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
