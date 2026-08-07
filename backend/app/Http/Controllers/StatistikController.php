<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStatistikDataRequest;
use App\Models\StatistikCat;
use App\Models\StatistikData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatistikController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $periode = $request->input('periode', now()->format('Y-m'));

        $categories = StatistikCat::query()
            ->with(['data' => fn ($q) => $q->where('periode', $periode)])
            ->orderBy('urutan')
            ->get();

        $result = [];

        foreach ($categories as $cat) {
            $columns = $cat->columns;
            $hasJumlah = collect($columns)->contains('key', 'jumlah');
            $valueKeys = collect($columns)->pluck('key')->reject(fn ($k) => $k === 'jumlah')->all();

            $rows = $cat->data->sortBy('rt')->map(function ($item) use ($valueKeys, $hasJumlah) {
                $row = [
                    'id' => $item->id,
                    'rt' => $item->rt,
                ];
                $sum = 0;
                foreach ($valueKeys as $key) {
                    $row[$key] = $item->values[$key] ?? 0;
                    $sum += $row[$key];
                }
                if ($hasJumlah) {
                    $row['jumlah'] = $sum;
                }

                return $row;
            })->values();

            $totals = [];
            foreach ($columns as $col) {
                if ($col['key'] === 'jumlah' && $hasJumlah) {
                    $totals['jumlah'] = $rows->sum(fn ($r) => $r['jumlah'] ?? 0);
                } else {
                    $totals[$col['key']] = $rows->sum(fn ($r) => $r[$col['key']] ?? 0);
                }
            }

            $result[$cat->nama] = [
                'id' => $cat->id,
                'keys' => collect($columns)->pluck('key')->all(),
                'columns' => $columns,
                'chartTitle' => $cat->chart_title,
                'chartColors' => $cat->chart_colors,
                'totals' => $totals,
                'data' => $rows,
            ];
        }

        return response()->json(['data' => $result, 'periode' => $periode]);
    }

    public function store(StoreStatistikDataRequest $request): JsonResponse
    {
        $data = StatistikData::updateOrCreate(
            [
                'category_id' => $request->category_id,
                'rt' => $request->rt,
                'periode' => $request->periode,
            ],
            ['values' => $request->values]
        );

        return response()->json(['message' => 'Data statistik berhasil disimpan.', 'data' => $data], 201);
    }

    public function destroy(StatistikData $statistikDatum): JsonResponse
    {
        $statistikDatum->delete();

        return response()->json(['message' => 'Data statistik berhasil dihapus.']);
    }
}
