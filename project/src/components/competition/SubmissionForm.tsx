import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CompetitionEntry } from '@/types/competition';

const submissionSchema = z.object({
  recipeName: z.string().min(3, 'Recipe name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.string()).min(1, 'At least one instruction is required'),
  photos: z.array(z.string()).min(1, 'At least one photo is required'),
});

type SubmissionInputs = z.infer<typeof submissionSchema>;

interface SubmissionFormProps {
  entryId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entryId: string, submission: CompetitionEntry['submission']) => Promise<void>;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({
  entryId,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SubmissionInputs>({
    resolver: zodResolver(submissionSchema),
  });

  const ingredients = watch('ingredients', []);
  const instructions = watch('instructions', []);

  const handleAddIngredient = () => {
    setValue('ingredients', [...ingredients, '']);
  };

  const handleAddInstruction = () => {
    setValue('instructions', [...instructions, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    setValue(
      'ingredients',
      ingredients.filter((_, i) => i !== index)
    );
  };

  const handleRemoveInstruction = (index: number) => {
    setValue(
      'instructions',
      instructions.filter((_, i) => i !== index)
    );
  };

  const onSubmitForm = async (data: SubmissionInputs) => {
    try {
      await onSubmit(entryId, {
        ...data,
        ingredients: data.ingredients.filter(Boolean),
        instructions: data.instructions.filter(Boolean),
      });
      onClose();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Submit Your Recipe</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipe Name
            </label>
            <input
              {...register('recipeName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.recipeName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.recipeName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients
            </label>
            {ingredients.map((_, index) => (
              <div key={index} className="flex mb-2">
                <input
                  {...register(`ingredients.${index}`)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Enter ingredient"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instructions
            </label>
            {instructions.map((_, index) => (
              <div key={index} className="flex mb-2">
                <textarea
                  {...register(`instructions.${index}`)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Enter instruction step"
                  rows={2}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveInstruction(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddInstruction}
            >
              Add Instruction
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photos
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Upload photos of your dish
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Recipe</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;