import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Calendar, Link as LinkIcon, Download, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import CVBadge from './CVBadge';

const KanbanBoard = ({ applications, onEdit, onDelete, onStatusChange, onDownloadCV, onView }) => {
  const columns = ['Applied', 'Interview', 'Offer', 'Rejected'];

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      onStatusChange(draggableId, destination.droppableId);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4 custom-scrollbar min-h-[60vh]">
        {columns.map(status => {
          const columnApps = applications.filter(app => app.status === status);
          return (
            <div key={status} className="glass-panel flex-1 min-w-[320px] rounded-2xl p-4 flex flex-col bg-white/5 border border-white/5">
              <div className="flex justify-between items-center mb-4 px-2 tracking-wide">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">{status}</h3>
                <span className="bg-white/10 text-xs font-bold px-2 py-1 rounded-full text-gray-400">{columnApps.length}</span>
              </div>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div 
                    {...provided.droppableProps} 
                    ref={provided.innerRef} 
                    className={`flex-1 rounded-xl transition-colors p-1 ${snapshot.isDraggingOver ? 'bg-indigo-500/10' : ''}`}
                  >
                    {columnApps.map((app, index) => (
                      <Draggable key={app._id} draggableId={app._id} index={index}>
                        {(provided, snapshot) => (
                          <div 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                            onClick={() => onView(app)}
                            className={`glass-card p-4 mb-4 relative group rounded-xl border ${snapshot.isDragging ? 'border-indigo-500 shadow-2xl shadow-indigo-500/30 z-50 scale-105' : 'border-white/10'} hover:border-indigo-500/30 transition-all cursor-grab active:cursor-grabbing hover:bg-white/5`}
                            style={{ ...provided.draggableProps.style }}
                          >
                            <div className="flex flex-col mb-3 pr-10">
                              <h4 className="font-bold text-white text-base line-clamp-1">{app.company}</h4>
                              <p className="text-indigo-300/80 text-xs font-medium line-clamp-1">{app.position}</p>
                            </div>
                            
                            {app.salary && (
                              <p className="text-emerald-400/80 text-[11px] font-bold mb-3 bg-emerald-500/10 inline-block px-2 py-0.5 rounded-md border border-emerald-500/20">{app.salary}</p>
                            )}

                            <div className="flex items-center justify-between mt-1 mb-4">
                              <CVBadge type={app.cvType} />
                              <div className="flex gap-2 relative z-20">
                                {app.jobUrl && (
                                  <a href={app.jobUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 px-2 rounded-md bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-white/5" title="View Job Posting">
                                    <LinkIcon className="w-3.5 h-3.5" />
                                  </a>
                                )}
                                {app.cvFile && (
                                  <button onClick={(e) => onDownloadCV(app.cvFile, e)} className="p-1 px-2 rounded-md bg-indigo-500/20 text-indigo-300 hover:text-white hover:bg-indigo-500 transition-colors border border-indigo-500/30" title="Download Attached CV">
                                    <Download className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                               <div className="flex items-center text-xs text-gray-500">
                                 <Calendar className="w-3.5 h-3.5 mr-2 text-indigo-400/50" />
                                 {format(new Date(app.appliedAt), 'MMM do, yyyy')}
                               </div>
                            </div>

                            {/* Actions Overlay */}
                            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                              <button onClick={(e) => { e.stopPropagation(); onEdit(app); }} className="p-1.5 rounded-lg bg-black/60 text-gray-300 hover:text-white hover:bg-indigo-500 transition-colors border border-white/10 hover:border-indigo-500/50">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); onDelete(app._id); }} className="p-1.5 rounded-lg bg-black/60 text-gray-300 hover:text-white hover:bg-rose-500 transition-colors border border-white/10 hover:border-rose-500/50">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
